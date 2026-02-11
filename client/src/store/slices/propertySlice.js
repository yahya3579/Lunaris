
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProperties as fetchPropertiesService, addProperty as addPropertyService, editProperty as editPropertyService, deleteProperty as deletePropertyService, fetchPropertyById as fetchPropertyByIdService } from '../../services/propertyService';
// Fetch single property by ID
export const fetchPropertyById = createAsyncThunk(
  'property/fetchPropertyById',
  async (id) => {
    return await fetchPropertyByIdService(id);
  }
);


export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async () => {
    return await fetchPropertiesService();
  }
);


export const addProperty = createAsyncThunk(
  'property/addProperty',
  async (property) => {
    return await addPropertyService(property);
  }
);


// Now supports images in property payload (imageCover removed)
export const editProperty = createAsyncThunk(
  'property/editProperty',
  async ({ id, property }) => {
    // property can include images as File objects
    return await editPropertyService(id, property);
  }
);


export const deleteProperty = createAsyncThunk(
  'property/deleteProperty',
  async (id) => {
    return await deletePropertyService(id);
  }
);
// If you want to support image update from slice, you can add:
// export const updatePropertyImages = createAsyncThunk(
//   'property/updatePropertyImages',
//   async ({ id, imagesData }) => {
//     return await updatePropertyImagesService(id, imagesData);
//   }
// );

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    properties: [],
    loading: false,
    error: null,
    selectedProperty: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.data;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.properties.push(action.payload);
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        const idx = state.properties.findIndex(p => p._id === action.payload._id);
        if (idx !== -1) state.properties[idx] = action.payload;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(p => p._id !== action.payload);
      })
      // Single property fetch
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProperty = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload.data;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.selectedProperty = null;
      });
  },
});

export default propertySlice.reducer;
