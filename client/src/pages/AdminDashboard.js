import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/slices/authSlice';
import { addProperty } from '../services/propertyService';
import { fetchProperties } from '../store/slices/propertySlice';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye, FaImage, FaStar, FaMapMarkerAlt, FaHome, FaBed, FaBath, FaUsers, FaWifi, FaCar, FaSwimmingPool, FaUtensils, FaTv, FaSnowflake, FaLeaf, FaWater, FaVideo, FaBicycle, FaDumbbell, FaShieldAlt, FaTimes, FaKey, FaHandSparkles, FaCalendarTimes, FaChevronLeft, FaChevronRight, FaBook, FaCoffee, FaLaptop, FaTable, FaSuitcase, FaCouch, FaFireExtinguisher, FaFirstAid, FaTshirt, FaFire, FaShower, FaArrowUp, FaCalendarAlt, FaPlug, FaChair, FaDoorOpen, FaBell, FaMusic } from 'react-icons/fa';
import lunarisLogo from '../assets/images/Lunaris-management-logo.png';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  // Remove fetched image from editProperty.images
  const removeFetchedEditImage = (index) => {
    setEditProperty(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  // Edit Property Modal State
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [editSelectedImages, setEditSelectedImages] = useState([]);
  const [editImagePreviewUrls, setEditImagePreviewUrls] = useState([]); // eslint-disable-line no-unused-vars
  const [editLoading, setEditLoading] = useState(false);
  // Edit Property Handler
  const { editProperty: editPropertyThunk } = require('../store/slices/propertySlice');
  const handleEditPropertyClick = (property) => {
    setEditProperty({
      ...property,
      name: property.name || property.title || '',
      title: property.title || property.name || '',
      location: property.location || property.address || '',
      address: property.address || property.location || '',
    });
    setEditSelectedImages([]);
    setEditImagePreviewUrls(property.images || []);
    setShowEditPropertyModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProperty(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files);
    const combinedImages = [...editSelectedImages, ...files];
    setEditSelectedImages(combinedImages);
    setEditImagePreviewUrls(combinedImages.map(file => URL.createObjectURL(file)));
    e.target.value = '';
  };

  const removeEditImage = (index) => {
    const updatedImages = editSelectedImages.filter((_, i) => i !== index);
    setEditSelectedImages(updatedImages);
    setEditImagePreviewUrls(updatedImages.map(file => URL.createObjectURL(file)));
  };

  const handleEditPropertySubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    let formData;
    // If new images are uploaded, use FormData and send files
    if (editSelectedImages.length > 0) {
      formData = new FormData();
      formData.append('title', editProperty.title || editProperty.name || '');
      formData.append('address', editProperty.address || editProperty.location || '');
      formData.append('description', editProperty.fullDescription || editProperty.description || '');
      formData.append('details.bedrooms',
        editProperty.bedrooms !== undefined && editProperty.bedrooms !== ''
          ? parseInt(editProperty.bedrooms)
          : (editProperty.details?.bedrooms !== undefined ? parseInt(editProperty.details.bedrooms) : '')
      );
      formData.append('details.beds',
        editProperty.beds !== undefined && editProperty.beds !== ''
          ? parseInt(editProperty.beds)
          : (editProperty.details?.beds !== undefined ? parseInt(editProperty.details.beds) : '')
      );
      formData.append('details.bathrooms',
        editProperty.bathrooms !== undefined && editProperty.bathrooms !== ''
          ? parseInt(editProperty.bathrooms)
          : (editProperty.details?.bathrooms !== undefined ? parseInt(editProperty.details.bathrooms) : '')
      );
      formData.append('details.maxGuests',
        editProperty.guests !== undefined && editProperty.guests !== ''
          ? parseInt(editProperty.guests)
          : (editProperty.details?.maxGuests !== undefined ? parseInt(editProperty.details.maxGuests) : '')
      );
      // Features (always as JSON)
      formData.append('features', JSON.stringify(editProperty.features || []));
      // Amenities (always as JSON)
      formData.append('amenities', JSON.stringify(editProperty.amenities || []));
      // Images: only send new files
      editSelectedImages.forEach((img) => {
        formData.append('images', img);
      });
      // Send existing image filenames as JSON
      formData.append('existingImages', JSON.stringify(editProperty.images || []));
      // Reviews
      formData.append('reviews', JSON.stringify(editProperty.reviews || []));
    } else {
      // No new images: send updated image filenames as JSON
      formData = {
        title: editProperty.name,
        address: editProperty.location,
        description: editProperty.fullDescription || editProperty.description || '',
        'details.bedrooms':
          editProperty.bedrooms !== undefined && editProperty.bedrooms !== ''
            ? parseInt(editProperty.bedrooms)
            : (editProperty.details?.bedrooms !== undefined ? parseInt(editProperty.details.bedrooms) : ''),
        'details.beds':
          editProperty.beds !== undefined && editProperty.beds !== ''
            ? parseInt(editProperty.beds)
            : (editProperty.details?.beds !== undefined ? parseInt(editProperty.details.beds) : ''),
        'details.bathrooms':
          editProperty.bathrooms !== undefined && editProperty.bathrooms !== ''
            ? parseInt(editProperty.bathrooms)
            : (editProperty.details?.bathrooms !== undefined ? parseInt(editProperty.details.bathrooms) : ''),
        'details.maxGuests':
          editProperty.guests !== undefined && editProperty.guests !== ''
            ? parseInt(editProperty.guests)
            : (editProperty.details?.maxGuests !== undefined ? parseInt(editProperty.details.maxGuests) : ''),
        features: editProperty.features || [],
        amenities: editProperty.amenities || [],
        images: editProperty.images || [],
        reviews: editProperty.reviews && editProperty.reviews.length > 0 ? JSON.stringify(editProperty.reviews) : undefined
      };
    }
    try {
      await dispatch(editPropertyThunk({ id: editProperty._id || editProperty.id, property: formData }));
      await dispatch(fetchProperties());
      setShowEditPropertyModal(false);
      setEditProperty(null);
      setEditSelectedImages([]);
      setEditImagePreviewUrls([]);
    } catch (err) {
      alert('Failed to update property');
    } finally {
      setEditLoading(false);
    }
  };
  const [showAmenityIconPicker, setShowAmenityIconPicker] = useState(false);
  const [customAmenityIcon, setCustomAmenityIcon] = useState('FaPlus');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth);

  // Check authentication using Redux state
  useEffect(() => {
    if (!user || !token) {
      window.location.href = '/adminlogin';
    }
    dispatch(fetchProperties());
  }, [user, token, dispatch]);

  const handleLogout = () => {
    const logoutAndRedirect = async () => {
      await dispatch(logOut());
      window.location.href = '/adminlogin';
    };
    logoutAndRedirect();
  };
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  // Use Redux for properties
  const properties = useSelector(state => state.property.properties);
  const loading = useSelector(state => state.property.loading);
  const error = useSelector(state => state.property.error);
  // Fetch properties on mount
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const [newProperty, setNewProperty] = useState({
    name: '',
    location: '',
    guests: '',
    bedrooms: '',
    bathrooms: '',
    fullDescription: '',
    images: [],
    features: [],
    customFeatures: [],
    amenities: [],
    customAmenities: [],
    reviews: []
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [customAmenityInput, setCustomAmenityInput] = useState('');
  const [customFeatureName, setCustomFeatureName] = useState('');
  const [customFeatureDescription, setCustomFeatureDescription] = useState('');
  const [customFeatureIcon, setCustomFeatureIcon] = useState('FaPlus');

  // Icon options for dropdown
  const iconMap = {
    FaPlus, FaEdit, FaTrash, FaEye, FaImage, FaStar, FaMapMarkerAlt, FaHome, FaBed, FaBath, FaUsers, FaWifi, FaCar, FaSwimmingPool, FaUtensils, FaTv, FaSnowflake, FaLeaf, FaWater, FaVideo, FaBicycle, FaDumbbell, FaShieldAlt, FaTimes, FaKey, FaHandSparkles, FaCalendarTimes, FaChevronLeft, FaChevronRight, FaBook, FaCoffee, FaLaptop, FaTable, FaSuitcase, FaCouch, FaFireExtinguisher, FaFirstAid, FaTshirt, FaFire, FaShower, FaArrowUp, FaCalendarAlt, FaPlug, FaChair, FaDoorOpen, FaBell, FaMusic
  };
  const iconOptions = Object.keys(iconMap);

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    username: '',
    userphoto: null,
    userphotoPreview: '',
    review: '',
    rating: 3,
    date: ''
  });

  const availableFeatures = [
    { icon: 'FaHome', name: 'Entire home', description: "You'll have the apartment to yourself", id: 'entire_home' },
    { icon: 'FaHandSparkles', name: 'Enhanced Clean', description: "This Host committed to Airbnb's 5-step enhanced cleaning process", id: 'enhanced_clean' },
    { icon: 'FaKey', name: 'Self check-in', description: 'Check yourself in with the keypad', id: 'self_checkin' },
    { icon: 'FaCalendarTimes', name: 'Free cancellation', description: 'Flexible cancellation policy', id: 'free_cancellation' },
    { icon: 'FaUsers', name: 'Checkin by staff', description: 'Staff will assist you during check-in', id: 'checkin_by_staff' },
    { icon: 'FaCalendarAlt', name: 'Available during stay', description: 'Staff available for assistance during your stay', id: 'available_during_stay' }
  ];

  const availableAmenities = [
    { icon: 'FaSnowflake', name: 'Air conditioning', id: 'ac' },
    { icon: 'FaBath', name: 'Bath', id: 'bath' },
    { icon: 'FaBed', name: 'Bed linen', id: 'bed_linen' },
    { icon: 'FaBook', name: 'Books & reading material', id: 'books' },
    { icon: 'FaCoffee', name: 'Coffee', id: 'coffee' },
    { icon: 'FaUtensils', name: 'Cooking basics', id: 'cooking_basics' },
    { icon: 'FaLaptop', name: 'Dedicated workspace', id: 'workspace' },
    { icon: 'FaTable', name: 'Dining table', id: 'dining_table' },
    { icon: 'FaSuitcase', name: 'Essentials', id: 'essentials' },
    { icon: 'FaCouch', name: 'Extra pillows & blankets', id: 'extra_pillows_blankets' },
    { icon: 'FaFireExtinguisher', name: 'Fire extinguisher', id: 'fire_extinguisher' },
    { icon: 'FaFirstAid', name: 'First aid kit', id: 'first_aid_kit' },
    { icon: 'FaCar', name: 'Free parking on premises', id: 'parking' },
    { icon: 'FaLeaf', name: 'Garden', id: 'garden' },
    { icon: 'FaTshirt', name: 'Hangers', id: 'hangers' },
    { icon: 'FaFire', name: 'Heating', id: 'heating' },
    { icon: 'FaShower', name: 'Hot water', id: 'hot_water' },
    { icon: 'FaUtensils', name: 'Kitchen', id: 'kitchen' },
    { icon: 'FaUtensils', name: 'Kitchenette', id: 'kitchenette' },
    { icon: 'FaTshirt', name: 'Launderette nearby', id: 'launderette' },
    { icon: 'FaArrowUp', name: 'Lift', id: 'lift' },
    { icon: 'FaCalendarAlt', name: 'Long-term stays allowed', id: 'longterm_stays' },
    { icon: 'FaPlug', name: 'Microwave', id: 'microwave' },
    { icon: 'FaChair', name: 'Outdoor furniture', id: 'outdoor_furniture' },
    { icon: 'FaUtensils', name: 'Outdoor dining area', id: 'outdoor_dining' },
    // { icon: 'FaUmbrellaBeach', name: 'Balcony', id: 'balcony' }, // Not in react-icons/fa
    { icon: 'FaDoorOpen', name: 'Private entrance', id: 'private_entrance' },
    { icon: 'FaCouch', name: 'Private living room', id: 'private_living_room' },
    // { icon: 'FaWindowMaximize', name: 'Room-darkening blinds', id: 'room_darkening_blinds' }, // Not in react-icons/fa
    { icon: 'FaBell', name: 'Smoke alarm', id: 'smoke_alarm' },
    { icon: 'FaMusic', name: 'Sound system', id: 'sound_system' },
    { icon: 'FaTv', name: 'TV', id: 'tv' },
    { icon: 'FaWifi', name: 'Wi-Fi', id: 'wifi' },
    { icon: 'FaSwimmingPool', name: 'Pool', id: 'pool' },
    { icon: 'FaWater', name: 'Free washer - in building', id: 'washer' },
    { icon: 'FaUtensils', name: 'Refrigerator', id: 'refrigerator' },
    { icon: 'FaVideo', name: 'Dryer', id: 'dryer' },
    { icon: 'FaShieldAlt', name: 'Security cameras on property', id: 'security' },
    { icon: 'FaBicycle', name: 'Bicycles', id: 'bicycles' },
    { icon: 'FaUsers', name: 'Pets allowed', id: 'pets' },
    { icon: 'FaDumbbell', name: 'Gym/Fitness center', id: 'gym' },
    { icon: 'FaWifi', name: 'High-speed internet', id: 'highspeed_wifi' },
    { icon: 'FaCar', name: 'Garage parking', id: 'garage' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProperty(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const combinedImages = [...selectedImages, ...files];
    setSelectedImages(combinedImages);
    // Create URLs for preview
    const imageUrls = combinedImages.map(file => URL.createObjectURL(file));
    setNewProperty(prev => ({
      ...prev,
      images: imageUrls
    }));
    // Clear the input so same files can be selected again if needed
    e.target.value = '';
  };

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    const imageUrls = updatedImages.map(file => URL.createObjectURL(file));
    setNewProperty(prev => ({
      ...prev,
      images: imageUrls
    }));
  };

  const handleFeatureToggle = (feature) => {
    setNewProperty(prev => {
      const isSelected = prev.features.some(f => f.id === feature.id);
      if (isSelected) {
        return {
          ...prev,
          features: prev.features.filter(f => f.id !== feature.id)
        };
      } else {
        // Use icon string directly
        return {
          ...prev,
          features: [...prev.features, { ...feature, icon: feature.icon }]
        };
      }
    });
  };

  const handleAddCustomFeature = () => {
    if (customFeatureName.trim() !== '' && customFeatureDescription.trim() !== '') {
      // Store icon as string name
      const customFeature = {
        icon: customFeatureIcon,
        name: customFeatureName.trim(),
        description: customFeatureDescription.trim(),
        id: `custom_feature_${Date.now()}`,
        isCustom: true
      };
      setNewProperty(prev => ({
        ...prev,
        customFeatures: [...prev.customFeatures, customFeature]
      }));
      setCustomFeatureName('');
      setCustomFeatureDescription('');
      setCustomFeatureIcon('FaPlus');
    }
  };

  const handleRemoveCustomFeature = (customFeatureId) => {
    setNewProperty(prev => ({
      ...prev,
      customFeatures: prev.customFeatures.filter(f => f.id !== customFeatureId)
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setNewProperty(prev => {
      const isSelected = prev.amenities.some(a => a.id === amenity.id);
      if (isSelected) {
        return {
          ...prev,
          amenities: prev.amenities.filter(a => a.id !== amenity.id)
        };
      } else {
        // Use icon string directly
        return {
          ...prev,
          amenities: [...prev.amenities, { ...amenity, icon: amenity.icon }]
        };
      }
    });
  };

  const handleAddCustomAmenity = () => {
    if (customAmenityInput.trim() !== '') {
      // Store icon as string name
      const customAmenity = {
        icon: customAmenityIcon,
        name: customAmenityInput.trim(),
        id: `custom_${Date.now()}`,
        isCustom: true
      };
      setNewProperty(prev => ({
        ...prev,
        customAmenities: [...prev.customAmenities, customAmenity]
      }));
      setCustomAmenityInput('');
      setCustomAmenityIcon('FaPlus');
    }
  };

  const handleRemoveCustomAmenity = (customAmenityId) => {
    setNewProperty(prev => ({
      ...prev,
      customAmenities: prev.customAmenities.filter(a => a.id !== customAmenityId)
    }));
  };

  // Review handlers
  const handleReviewInputChange = (field, value) => {
    setReviewForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReviewPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setReviewForm(prev => ({
        ...prev,
        userphoto: file,
        userphotoPreview: previewUrl
      }));
    }
  };

  const handleAddReview = () => {
    if (reviewForm.username.trim() && reviewForm.userphoto && reviewForm.review.trim()) {
      const newReview = {
        id: `review_${Date.now()}`,
        username: reviewForm.username.trim(),
        photoIndex: newProperty.reviews.length, // reference image index
        review: reviewForm.review.trim(),
        rating: reviewForm.rating,
        date: reviewForm.date
      };
      setNewProperty(prev => ({
        ...prev,
        reviews: [...prev.reviews, newReview],
        reviewImages: [...(prev.reviewImages || []), reviewForm.userphoto] // store image file
      }));
      // Reset form
      setReviewForm({
        username: '',
        userphoto: null,
        userphotoPreview: '',
        review: '',
        rating: 3,
        date: ''
      });
    }
  };

  const handleRemoveReview = (reviewId) => {
    setNewProperty(prev => ({
      ...prev,
      reviews: prev.reviews.filter(r => r.id !== reviewId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!newProperty.name || !newProperty.location) {
      alert('Please fill in all required fields');
      return;
    }


    // Prepare FormData for API (match backend schema)
    const formData = new FormData();
    formData.append('title', newProperty.name); // name -> title
    formData.append('address', newProperty.location); // location -> address
    formData.append('description', newProperty.fullDescription); // fullDescription -> description

    // details fields
    formData.append('details.bedrooms', parseInt(newProperty.bedrooms) || 1);
    formData.append('details.beds', parseInt(newProperty.bedrooms) || 1); // You may want a separate beds field in your form
    formData.append('details.bathrooms', parseInt(newProperty.bathrooms) || 1);
    formData.append('details.maxGuests', parseInt(newProperty.guests) || 1);

    // Features: array of { name, description, icon }
    const features = [...newProperty.features, ...newProperty.customFeatures].map(f => ({
      name: f.name,
      description: f.description || '',
      icon: typeof f.icon === 'string' ? f.icon : (f.icon?.displayName || 'FaPlus')
    }));
    features.forEach((feature, idx) => {
      formData.append(`features[${idx}][name]`, feature.name);
      formData.append(`features[${idx}][description]`, feature.description);
      formData.append(`features[${idx}][icon]`, feature.icon);
    });

    // Amenities: array of objects { name, icon }
    const amenities = [...newProperty.amenities, ...newProperty.customAmenities].map(a => ({
      name: a.name,
      icon: typeof a.icon === 'string' ? a.icon : (a.icon?.displayName || 'FaPlus')
    }));
    amenities.forEach((amenity, idx) => {
      formData.append(`amenities[${idx}][name]`, amenity.name);
      formData.append(`amenities[${idx}][icon]`, amenity.icon);
    });


    // Images
    selectedImages.forEach((img) => {
      formData.append('images', img);
    });

    // Reviews: send as JSON string
    if (newProperty.reviews && newProperty.reviews.length > 0) {
      formData.append('reviews', JSON.stringify(newProperty.reviews));
      // Send review images
      if (newProperty.reviewImages && newProperty.reviewImages.length > 0) {
        newProperty.reviewImages.forEach((img, idx) => {
          formData.append(`reviewImages[${idx}]`, img);
        });
      }
    }

    try {
      await addProperty(formData);
      // Refetch properties after adding
      await dispatch(fetchProperties());
      // Reset form
      setNewProperty({
        name: '',
        location: '',
        guests: '',
        bedrooms: '',
        bathrooms: '',
        fullDescription: '',
        images: [],
        features: [],
        customFeatures: [],
        amenities: [],
        customAmenities: [],
        reviews: []
      });
      setSelectedImages([]);
      setCustomAmenityInput('');
      setCustomFeatureName('');
      setCustomFeatureDescription('');
      setReviewForm({
        username: '',
        userphoto: null,
        userphotoPreview: '',
        review: '',
        rating: 3
      });
      setShowAddPropertyModal(false);
      alert('Property added successfully!');
    } catch (err) {
      // Show backend error message if available
      const backendError = err?.response?.data?.error || err?.message || 'Failed to add property. Please check required fields and try again.';
      alert(backendError);
      console.error(err);
    }
  };

  // Use Redux for deleting property
  const { deleteProperty: deletePropertyThunk } = require('../store/slices/propertySlice');
  const deleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const resultAction = await dispatch(deletePropertyThunk(id));
        if (deletePropertyThunk.fulfilled.match(resultAction)) {
          const message = resultAction.payload?.message || 'Property deleted successfully.';
          toast.success(message);
        } else {
          const errorMsg = resultAction.error?.message || 'Failed to delete property.';
          toast.error(errorMsg);
        }
        // Refetch properties after deleting
        await dispatch(fetchProperties());
      } catch (err) {
        toast.error('Failed to delete property.');
      }
    }
  };

  // Image slider functions
  const nextImage = (propertyId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (propertyId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const goToImage = (propertyId, imageIndex) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: imageIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      {/* Navigation */}
      <nav className="border-b border-gray-200 py-2 sm:py-3 bg-gradient-to-r from-[#121b2d] via-[#1a2540] to-[#24304a] backdrop-blur-md bg-opacity-80 shadow-xl rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center h-auto sm:h-14 gap-2 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <Link to="/">
                <img
                  src={lunarisLogo}
                  alt="Lunaris Management & Co."
                  className="h-10 w-24 sm:h-12 sm:w-32 lg:h-14 lg:w-36 drop-shadow-xl rounded-xl bg-white/10 p-1 cursor-pointer"
                />
              </Link>
              <span className="text-lg sm:text-xl font-bold text-white tracking-wide drop-shadow mt-2 sm:mt-0">Admin Dashboard</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
              <Link
                to="/"
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-xl text-sm font-semibold shadow-lg transition-all border border-white/30 backdrop-blur-sm w-full sm:w-auto text-center"
              >
                View Site
              </Link>
              <button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-1.5 rounded-xl text-sm font-semibold shadow-lg transition-all w-full sm:w-auto" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow">Property Management</h1>
          <p className="text-lg sm:text-xl text-gray-600">Manage your properties and listings with ease and style</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 sm:mb-8">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('properties')}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === 'properties'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Properties ({properties.length})
            </button>
          </nav>
        </div>

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            {/* Add Property Button */}
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">All Properties</h2>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm w-fit">
                  {loading ? 'Loading...' : properties.length + ' total'}
                </span>
              </div>
              <button
                onClick={() => setShowAddPropertyModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium text-sm sm:text-base w-full sm:w-auto"
              >
                <FaPlus className="w-4 h-4" />
                Add Property
              </button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {error && (
                <div className="col-span-full text-red-600 font-semibold">Error: {error}</div>
              )}
              {!loading && properties.length > 0 && properties.map((property) => {
                // Use _id for MongoDB, fallback to id
                const propertyId = property._id || property.id;
                const currentIndex = currentImageIndex[propertyId] || 0;
                return (
                  <div key={propertyId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="h-40 sm:h-48 bg-gray-200 relative overflow-hidden">
                      {property.images && property.images.length > 0 ? (
                        <>
                          <img
                            src={(() => {
                              const imgSrc = property.images[currentIndex];
                              if (typeof imgSrc === 'string' && (imgSrc.startsWith('http://') || imgSrc.startsWith('https://'))) {
                                return imgSrc;
                              } else if (typeof imgSrc === 'string') {
                                return `${API_BASE_URL}/public/images/properties/${imgSrc}`;
                              } else {
                                return '';
                              }
                            })()}
                            alt={property.name || property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={e => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                          />
                          {/* Navigation Arrows */}
                          {property.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevImage(propertyId, property.images.length);
                                }}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                              >
                                <FaChevronLeft className="w-3 h-3 text-gray-800" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextImage(propertyId, property.images.length);
                                }}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                              >
                                <FaChevronRight className="w-3 h-3 text-gray-800" />
                              </button>
                            </>
                          )}
                          {/* Image Dots Indicator */}
                          {property.images.length > 1 && (
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                              {property.images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    goToImage(propertyId, index);
                                  }}
                                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-white'
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                    }`}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaImage className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 truncate text-sm sm:text-base">
                        <Link to={`/property/${propertyId}`} className="hover:text-blue-600 transition-colors">
                          {property.name || property.title}
                        </Link>
                      </h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2">
                        <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="truncate">{property.location || property.address}</span>
                      </div>
                      {/* Show only first 2 lines of description */}
                      {property.description && (
                        <p className="text-xs text-gray-700 mb-2 line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {property.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="flex items-center">
                            <FaUsers className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span>{property.guests || property.details?.maxGuests}</span>
                          </div>
                          <div className="flex items-center">
                            <FaBed className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span>{property.bedrooms || property.details?.bedrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <FaBath className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span>{property.bathrooms || property.details?.bathrooms}</span>
                          </div>
                        </div>
                        {property.rating > 0 && (
                          <div className="flex items-center">
                            <FaStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1" />
                            <span>{property.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-lg font-bold text-gray-900"></span>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <Link
                            to={`/property/${propertyId}`}
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Property"
                          >
                            <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Link>
                          <button
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit Property"
                            onClick={() => handleEditPropertyClick(property)}
                          >
                            <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => deleteProperty(propertyId)}
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Property"
                          >
                            <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {properties.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <FaHome className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">Get started by adding your first property.</p>
                <button
                  onClick={() => setShowAddPropertyModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base"
                >
                  Add Your First Property
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Edit Property Modal */}
      {showEditPropertyModal && editProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Property</h2>
                <button
                  onClick={() => setShowEditPropertyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleEditPropertySubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Name *</label>
                  <input type="text" name="name" value={editProperty.name || editProperty.title || ''} onChange={handleEditInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input type="text" name="location" value={editProperty.location || editProperty.address || ''} onChange={handleEditInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Guests</label>
                  <input type="number" name="guests" value={editProperty.guests || editProperty.details?.maxGuests || ''} onChange={handleEditInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" min="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <input type="number" name="bedrooms" value={editProperty.bedrooms || editProperty.details?.bedrooms || ''} onChange={handleEditInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" min="0" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                  <input type="number" name="bathrooms" value={editProperty.bathrooms || editProperty.details?.bathrooms || ''} onChange={handleEditInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" min="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Description</label>
                <textarea name="fullDescription" value={editProperty.fullDescription || editProperty.description || ''} onChange={handleEditInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Images <span className="text-gray-500 text-xs ml-2">({editSelectedImages.length} images selected)</span></label>
                <div className="space-y-3">
                  <div className="flex flex-col space-y-2">
                    <input type="file" multiple accept="image/*" onChange={handleEditImageChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
                    <p className="text-xs text-gray-600">Select images one by one or multiple at once. Supported formats: JPG, PNG, GIF, WebP</p>
                    {/* No max limit warning */}
                  </div>
                  {/* Image Preview: Show fetched images and newly selected images */}
                  {((editProperty.images && editProperty.images.length > 0) || editSelectedImages.length > 0) ? (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Images:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {/* Fetched images from backend */}
                        {editProperty.images && editProperty.images.map((img, index) => {
                          let src = '';
                          if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://'))) {
                            src = img;
                          } else if (typeof img === 'string') {
                            src = `${API_BASE_URL}/public/images/properties/${img}`;
                          }
                          return (
                            <div key={index} className="relative group">
                              <img src={src} alt={`Property ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-gray-300 transition-transform group-hover:scale-105" />
                              <button type="button" onClick={() => removeFetchedEditImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors" title="Remove image">×</button>
                            </div>
                          );
                        })}
                        {/* Newly selected images */}
                        {editSelectedImages.map((file, index) => (
                          <div key={`new-${index}`} className="relative group">
                            <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-gray-300 transition-transform group-hover:scale-105" />
                            <button type="button" onClick={() => removeEditImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors" title="Remove image">×</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FaImage className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No images selected yet</p>
                      <p className="text-xs text-gray-500 mt-1">Click above to select images</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                <button type="button" onClick={() => setShowEditPropertyModal(false)} className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm sm:text-base">Cancel</button>
                <button type="submit" className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add Property Modal */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Property</h2>
                <button
                  onClick={() => setShowAddPropertyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newProperty.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter property name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newProperty.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter location"
                    required
                  />
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={newProperty.guests}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Number of guests"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={newProperty.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Number of bedrooms"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={newProperty.bathrooms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Number of bathrooms"
                    min="0"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Description
                </label>
                <textarea
                  name="fullDescription"
                  value={newProperty.fullDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter detailed description of the property"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Images
                  <span className="text-gray-500 text-xs ml-2">
                    ({selectedImages.length} images selected)
                  </span>
                </label>
                <div className="space-y-3">
                  <div className="flex flex-col space-y-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      disabled={selectedImages.length >= 10}
                    />
                    <p className="text-xs text-gray-600">
                      Select images one by one or multiple at once. Supported formats: JPG, PNG, GIF, WebP
                    </p>
                  </div>

                  {/* Image Preview */}
                  {selectedImages.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {selectedImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-300 transition-transform group-hover:scale-105"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                              title="Remove image"
                            >
                              ×
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                              <p className="truncate">{file.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedImages.length === 0 && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FaImage className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No images selected yet</p>
                      <p className="text-xs text-gray-500 mt-1">Click above to select images</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Property Features
                </label>

                {/* Predefined Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Select key features:</h4>
                  <div className="space-y-3">
                    {availableFeatures.map((feature) => (
                      <label
                        key={feature.id}
                        className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${newProperty.features.some(f => f.id === feature.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={newProperty.features.some(f => f.id === feature.id)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="sr-only"
                        />
                        {React.createElement(require('react-icons/fa')[feature.icon], { className: "w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" })}
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900 block">{feature.name}</span>
                          <span className="text-xs text-gray-600">{feature.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Custom Features */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Add custom features:</h4>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                      {/* Icon Picker Button & Modal */}
                      <div className="flex flex-col items-center sm:items-start">
                        <button
                          type="button"
                          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none text-sm"
                          onClick={() => setShowIconPicker(true)}
                        >
                          {React.createElement(require('react-icons/fa')[customFeatureIcon], { className: "w-5 h-5 text-blue-600" })}
                          <span>Select Icon</span>
                        </button>
                        {/* Icon Picker Modal/Dropdown */}
                        {showIconPicker && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-700">Choose an Icon</span>
                                <button
                                  type="button"
                                  className="text-gray-400 hover:text-gray-700"
                                  onClick={() => setShowIconPicker(false)}
                                >
                                  <FaTimes className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto">
                                {iconOptions.map(iconName => {
                                  const IconComp = iconMap[iconName];
                                  return (
                                    <button
                                      type="button"
                                      key={iconName}
                                      onClick={() => { setCustomFeatureIcon(iconName); setShowIconPicker(false); }}
                                      className={`flex flex-col items-center justify-center p-2 rounded border transition-all ${customFeatureIcon === iconName ? 'border-blue-500 bg-blue-100' : 'border-transparent hover:border-gray-400'}`}
                                      title={iconName.replace('Fa', '')}
                                    >
                                      <IconComp className="w-7 h-7 mb-1" />
                                      <span className="text-[11px] text-gray-700">{iconName.replace('Fa', '')}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row flex-1 gap-2">
                        <input
                          type="text"
                          value={customFeatureName}
                          onChange={(e) => setCustomFeatureName(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Feature name (e.g., Pet-friendly, Business center)"
                        />
                        <input
                          type="text"
                          value={customFeatureDescription}
                          onChange={(e) => setCustomFeatureDescription(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddCustomFeature()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Feature description (e.g., Pets are welcome, Full business facilities)"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomFeature}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium flex items-center gap-1 whitespace-nowrap"
                        >
                          {React.createElement(require('react-icons/fa')[customFeatureIcon], { className: "w-3 h-3" })}
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Display Custom Features */}
                  {newProperty.customFeatures.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-500 mb-2">Custom features added:</h5>
                      <div className="flex flex-wrap gap-2">
                        {newProperty.customFeatures.map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-center space-x-2 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2"
                          >
                            {React.createElement(feature.icon, { className: "w-4 h-4 text-purple-600" })}
                            <span className="text-sm text-purple-800">{feature.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomFeature(feature.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Amenities
                </label>

                {/* Predefined Amenities */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Select from available amenities:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableAmenities.map((amenity) => (
                      <label
                        key={amenity.id}
                        className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 border rounded-lg cursor-pointer transition-colors ${newProperty.amenities.some(a => a.id === amenity.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={newProperty.amenities.some(a => a.id === amenity.id)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="sr-only"
                        />
                        {React.createElement(require('react-icons/fa')[amenity.icon], { className: "w-5 h-5 text-gray-600" })}
                        <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Custom Amenities */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Add custom amenities:</h4>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                    {/* Icon Picker Button & Modal for amenities */}
                    <div className="flex flex-col items-center sm:items-start">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none text-sm"
                        onClick={() => setShowAmenityIconPicker(true)}
                      >
                        {React.createElement(require('react-icons/fa')[customAmenityIcon], { className: "w-5 h-5 text-green-600" })}
                        <span>Select Icon</span>
                      </button>
                      {/* Icon Picker Modal/Dropdown */}
                      {showAmenityIconPicker && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-gray-700">Choose an Icon</span>
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-700"
                                onClick={() => setShowAmenityIconPicker(false)}
                              >
                                <FaTimes className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto">
                              {iconOptions.map(iconName => {
                                const IconComp = iconMap[iconName];
                                return (
                                  <button
                                    type="button"
                                    key={iconName}
                                    onClick={() => { setCustomAmenityIcon(iconName); setShowAmenityIconPicker(false); }}
                                    className={`flex flex-col items-center justify-center p-2 rounded border transition-all ${customAmenityIcon === iconName ? 'border-green-500 bg-green-100' : 'border-transparent hover:border-gray-400'}`}
                                    title={iconName.replace('Fa', '')}
                                  >
                                    <IconComp className="w-7 h-7 mb-1" />
                                    <span className="text-[11px] text-gray-700">{iconName.replace('Fa', '')}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row flex-1 gap-2">
                      <input
                        type="text"
                        value={customAmenityInput}
                        onChange={(e) => setCustomAmenityInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomAmenity()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Enter custom amenity (e.g., Rooftop terrace, Hot tub, etc.)"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomAmenity}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-1 whitespace-nowrap"
                      >
                        {React.createElement(require('react-icons/fa')[customAmenityIcon], { className: "w-3 h-3" })}
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Display Custom Amenities */}
                  {newProperty.customAmenities.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-500 mb-2">Custom amenities added:</h5>
                      <div className="flex flex-wrap gap-2">
                        {newProperty.customAmenities.map((amenity) => (
                          <div
                            key={amenity.id}
                            className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2"
                          >
                            <FaPlus className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-800">{amenity.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomAmenity(amenity.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Reviews Section */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Add Reviews:</h4>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={reviewForm.username}
                        onChange={(e) => handleReviewInputChange('username', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Username (e.g., John Doe)"
                      />
                      <input
                        type="date"
                        value={reviewForm.date}
                        onChange={(e) => handleReviewInputChange('date', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Review Date"
                      />
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleReviewPhotoUpload}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full"
                        />
                        {reviewForm.userphotoPreview && (
                          <div className="flex items-center gap-2">
                            <img
                              src={reviewForm.userphotoPreview}
                              alt="Preview"
                              className="w-10 h-10 rounded-full object-cover border border-gray-300"
                            />
                            <span className="text-xs text-gray-600">Photo selected</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <textarea
                      value={reviewForm.review}
                      onChange={(e) => handleReviewInputChange('review', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Review text (e.g., Amazing place to stay! Very clean and comfortable.)"
                      rows="3"
                    />

                    <div className="flex items-center gap-3 flex-wrap">
                      <label className="text-sm font-medium text-gray-600">Rating:</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleReviewInputChange('rating', star)}
                            className={`w-6 h-6 ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                          >
                            <FaStar className="w-full h-full" />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({reviewForm.rating}/5)</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddReview}
                        className="ml-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-1"
                      >
                        <FaPlus className="w-3 h-3" />
                        Add Review
                      </button>
                    </div>
                  </div>

                  {/* Display Added Reviews */}
                  {newProperty.reviews.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-xs font-medium text-gray-500 mb-3">Reviews added ({newProperty.reviews.length}):</h5>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {newProperty.reviews.map((review) => (
                          <div
                            key={review.id}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={review.userphoto}
                                alt={review.username}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/40x40/gray/white?text=U';
                                }}
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h6 className="font-medium text-gray-900 text-sm">{review.username}</h6>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveReview(review.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FaTimes className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                      key={star}
                                      className={`w-3 h-3 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                  <span className="text-xs text-gray-600 ml-1">({review.rating}/5)</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-2">{review.review}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddPropertyModal(false)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
