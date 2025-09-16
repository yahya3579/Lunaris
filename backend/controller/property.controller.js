import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Property from "../model/property.model.js";
import { deleteImagePromise } from "../utils/imageHandler.js";
import { checkValidObjectId } from "../utils/handlerFunc.js";

// export const getAllProperties = async (req, res) => {
//   try {
//     const properties = await Property.find().select(
//       "-reviews -features -amenities -details -description -__v"
//     );
//     res.status(200).json({
//       status: "success",
//       results: properties.length,
//       data: {
//         properties,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

export const getAllProperties = async (req, res) => {
  try {
    let queryObj = {};
    const { sortBy, order, ...filters } = req.query;
    Object.keys(req.query).forEach((param) => {
      const value = req.query[param];

      // check for bracket style: maxGuests[gte]
      const match = param.match(/^(\w+)\[(gte|lte|gt|lt)\]$/);

      if (match) {
        const field = match[1]; // e.g. "maxGuests"
        const op = match[2]; // e.g. "gte"

        if (["bedrooms", "beds", "bathrooms", "maxGuests"].includes(field)) {
          queryObj[`details.${field}`] = {
            ...queryObj[`details.${field}`],
            [`$${op}`]: Number(value), // convert string → number
          };
        }
      } else {
        // exact match (?bedrooms=3)
        if (["bedrooms", "beds", "bathrooms", "maxGuests"].includes(param)) {
          queryObj[`details.${param}`] = Number(value);
        }
      }
    });

    let query = Property.find(queryObj);
    console.log("REQ QUERY:", req.query);

    if (sortBy) {
      const sortField =
        sortBy === "recent"
          ? "createdAt"
          : sortBy === "rating"
          ? "rating.average"
          : sortBy;

      query = query.sort(order === "asc" ? sortField : `-${sortField}`);
    }

    const properties = await query.exec();

    res.status(200).json({
      status: "success",
      message: "Properties fetched successfully.",
      error: null,
      results: properties.length,
      data: properties,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: null,
      error: err.message
    });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params._id).populate(
      "reviews"
    );
    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: null,
        error: "Property not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Property fetched successfully.",
      error: null,
      data: {
        property,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: null,
      error: error.message,
    });
  }
};

export const createProperty = async (req, res) => {
  try {

    let { reviews, ...propertyData } = req.body;
    // Parse reviews if sent as JSON string
    if (typeof reviews === 'string') {
      try {
        reviews = JSON.parse(reviews);
      } catch (e) {
        reviews = [];
      }
    }

    // Parse amenities from form-data
    let amenities = [];
    if (req.body.amenities) {
      if (Array.isArray(req.body.amenities)) {
        amenities = req.body.amenities.map((a, idx) => {
          if (typeof a === 'object') return a;
          try {
            return JSON.parse(a);
          } catch {
            return { name: a, icon: 'FaPlus' };
          }
        });
      } else {
        amenities = [];
        let idx = 0;
        while (req.body[`amenities[${idx}][name]`] || req.body[`amenities[${idx}][icon]`]) {
          amenities.push({
            name: req.body[`amenities[${idx}][name]`] || '',
            icon: req.body[`amenities[${idx}][icon]`] || 'FaPlus'
          });
          idx++;
        }
      }
    }

    // Parse features from form-data
    let features = [];
    if (req.body.features) {
      if (Array.isArray(req.body.features)) {
        features = req.body.features.map((f, idx) => {
          if (typeof f === 'object') return f;
          try {
            return JSON.parse(f);
          } catch {
            return { name: f, description: '', icon: 'FaPlus' };
          }
        });
      } else {
        features = [];
        let idx = 0;
        while (req.body[`features[${idx}][name]`] || req.body[`features[${idx}][description]`] || req.body[`features[${idx}][icon]`]) {
          features.push({
            name: req.body[`features[${idx}][name]`] || '',
            description: req.body[`features[${idx}][description]`] || '',
            icon: req.body[`features[${idx}][icon]`] || 'FaPlus'
          });
          idx++;
        }
      }
    }

    let imageFilenames = [];
    if (req.files && req.files.images) {
      try {
        imageFilenames = req.files.images.map((file) => file.filename);
      } catch (err) {
        // Ignore file system errors (e.g., EROFS)
        imageFilenames = [];
      }
    }
    const newProperty = await Property.create({
      images: imageFilenames,
      ...propertyData,
      amenities,
      features,
    });

    // If reviews are sent, create them and link to property
    let createdReviews = [];
    if (reviews && Array.isArray(reviews)) {
      const Review = (await import('../model/review.model.js')).default;
      for (const [idx, review] of reviews.entries()) {
        // Get the uploaded image file for this review
        let photoFilename = undefined;
        const reviewImageField = `reviewImages[${review.photoIndex ?? idx}]`;
        if (req.files && req.files[reviewImageField] && req.files[reviewImageField][0]) {
          photoFilename = req.files[reviewImageField][0].filename;
        }
        const reviewDoc = await Review.create({
          user: review.username || review.user,
          photo: photoFilename || review.userphoto || review.photo,
          review: review.review,
          rating: review.rating,
          date: review.date || '',
          property: newProperty._id
        });
        createdReviews.push(reviewDoc);
      }
    }

    res.status(201).json({
      status: "success",
      message: "Property created successfully.",
      error: null,
      data: {
        property: newProperty,
        reviews: createdReviews,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: null,
      error: error.message,
    });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params._id);
    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: null,
        error: "Property not found",
      });
    }

    // Delete associated reviews and their images
    const Review = (await import('../model/review.model.js')).default;
    const reviews = await Review.find({ property: property._id });
    if (Array.isArray(reviews) && reviews.length > 0) {
      await Promise.all(
        reviews.map(async (review) => {
          if (review.photo) {
            try {
              await deleteImagePromise(
                [__dirname, "..", "public", "images", "properties"],
                review.photo
              );
            } catch (err) {
              if (err.code !== 'EROFS') console.error('Delete review image error:', err);
            }
          }
        })
      );
    }
    await Review.deleteMany({ property: property._id });

    // Delete property images
    const photos = property?.images || [];
    if (Array.isArray(photos) && photos.length > 0) {
      await Promise.all(
        photos.map(async (photo) => {
          try {
            await deleteImagePromise(
              [__dirname, "..", "public", "images", "properties"],
              photo
            );
          } catch (err) {
            if (err.code !== 'EROFS') console.error('Delete property image error:', err);
          }
        })
      );
    }

    // Delete the property itself
    await Property.findByIdAndDelete(req.params._id);

    res.status(200).json({
      status: "success",
      message: "Property deleted successfully.",
      error: null,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: null,
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updatePropertyImages = async (req, res) => {
  try {
    const { _id } = req.params;
    checkValidObjectId(Property, _id);

    const property = await Property.findById(_id);
    const photos = property?.images || [];
    if (Array.isArray(photos) && photos.length > 0) {
      await Promise.all(
        photos.map((photo) =>
          deleteImagePromise(
            [__dirname, "..", "public", "images", "properties"],
            photo
          )
        )
      );
    }
    const newProperty = await Property.findByIdAndUpdate(
      _id,
      {
        images: req.files.images?.map((file) => file.filename) || [],
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!newProperty) {
      return res.status(404).json({
        status: "fail",
        message: null,
        error: "Property not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Images updated successfully.",
      error: null,
      data: {
        newProperty,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: null,
      error: error.message,
    });
  }
};

export const updateProperty = async (req, res) => {
  // Debug log to check incoming files and body
  console.log('UPDATE PROPERTY req.files:', req.files);
  console.log('UPDATE PROPERTY req.body:', req.body);
  try {
    const { _id } = req.params;
    checkValidObjectId(Property, _id);

    // Find existing property
    const existingProperty = await Property.findById(_id);
    if (!existingProperty) {
      return res.status(404).json({
        status: "fail",
        message: null,
        error: "No property found with this ID",
      });
    }

    // Handle property images
    let updatedFields = { ...req.body };
    // Parse features and amenities if sent as JSON strings
    if (typeof updatedFields.features === 'string') {
      try {
        updatedFields.features = JSON.parse(updatedFields.features);
      } catch {
        updatedFields.features = [];
      }
    }
    if (typeof updatedFields.amenities === 'string') {
      try {
        updatedFields.amenities = JSON.parse(updatedFields.amenities);
      } catch {
        updatedFields.amenities = [];
      }
    }
    let imagesUpdated = false;
    let newImages = [];
    let frontendImages = [];
    // Get images array sent from frontend (existing images)
    if (req.body.existingImages) {
      try {
        frontendImages = JSON.parse(req.body.existingImages);
      } catch {
        frontendImages = [];
      }
    } else if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        frontendImages = req.body.images;
      } else if (typeof req.body.images === 'string') {
        try {
          frontendImages = JSON.parse(req.body.images);
        } catch {
          frontendImages = [req.body.images];
        }
      }
    } else {
      frontendImages = existingProperty.images || [];
    }

    // If new images are uploaded, append them to frontendImages
    if (req.files && req.files.images) {
      imagesUpdated = true;
      const uploadedImages = req.files.images?.map((file) => file.filename) || [];
      newImages = [...frontendImages, ...uploadedImages];
    } else {
      newImages = frontendImages;
    }

    // Find images to delete (present in old, not in new)
    const oldImages = existingProperty.images || [];
    const imagesToDelete = oldImages.filter(img => !newImages.includes(img));
    if (imagesToDelete.length > 0) {
      await Promise.all(
        imagesToDelete.map((photo) =>
          deleteImagePromise(
            [__dirname, "..", "public", "images", "properties"],
            photo
          )
        )
      );
    }
    updatedFields.images = newImages;

    // Handle reviews
    let updatedReviews = [];
    if (req.body.reviews) {
      let reviews = req.body.reviews;
      if (typeof reviews === 'string') {
        try {
          reviews = JSON.parse(reviews);
        } catch (e) {
          reviews = [];
        }
      }
      const Review = (await import('../model/review.model.js')).default;
      for (const review of reviews) {
        // Delete review
        if (review.delete && review._id) {
          await Review.findByIdAndDelete(review._id);
          continue;
        }
        // Update review
        if (review._id) {
          const updated = await Review.findByIdAndUpdate(
            review._id,
            {
              review: review.review,
              rating: review.rating,
              date: review.date || '',
              user: review.username || review.user,
              photo: review.photo || review.userphoto,
            },
            { new: true, runValidators: true }
          );
          if (updated) updatedReviews.push(updated);
        } else {
          // Create new review
          let photoFilename = undefined;
          // If you want to support review images upload, add logic here
          const created = await Review.create({
            user: review.username || review.user,
            photo: photoFilename || review.userphoto || review.photo,
            review: review.review,
            rating: review.rating,
            date: review.date || '',
            property: _id
          });
          updatedReviews.push(created);
        }
      }
    }

    const property = await Property.findByIdAndUpdate(_id, updatedFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: imagesUpdated ? "Property, images, and reviews updated successfully." : "Property and reviews updated successfully.",
      error: null,
      data: {
        property,
        reviews: updatedReviews,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: null,
      error: error.message,
    });
  }
};
