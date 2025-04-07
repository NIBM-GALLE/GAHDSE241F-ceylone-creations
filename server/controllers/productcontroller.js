import Product from '../models/product.js';
import Category from '../models/category.js';

// // Create a new product
// export const createProduct = async (req, res) => {
//   try {
//     const { title, description, price, itemadded_date, stock_quantity, category, categoryname } = req.body;

//     // Process uploaded images
//     const additionalImages = req.files.map((file) => `/uploads/${file.filename}`);

//     const product = new Product({
//       title,
//       description,
//       price,
//       itemadded_date,
//       stock_quantity,
//       category,
//       categoryname,
//       image: additionalImages[0], // Use the first image as the main image
//       additionalImages, // Save all uploaded images
//     });

//     await product.save();
//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).json({ message: "Failed to create product", error: error.message });
//   }
// };


export const createProduct = async (req, res) => {
  try {
      console.log("Request Body:", req.body); // Debugging
      console.log("Uploaded Files:", req.files); // Debugging

      const {
         title, 
         description,
          price, 
          itemadded_date, 
          stock_quantity, 
          category, 
          categoryname,
          profileName,
          country,
          postalCode,
          processingTimeMin,
          processingTimeMax,
          timeUnit,
          shippingService,
          deliveryTimeMin,
          deliveryTimeMax,
          cost,
          renewalOption, 

        } = req.body;
      let colors = req.body.colors;

      // Convert colors from JSON string to array if needed
      if (typeof colors === "string") {
          colors = JSON.parse(colors);
      }

      if (!Array.isArray(colors)) {
          return res.status(400).json({ message: "Invalid color data" });
      }

      // Process images for each color
      const colorImages = colors.map((colorData, index) => {
          const imageFiles = req.files.filter((file) => file.fieldname === `images[${index}]`);

          return {
              color: colorData.color, // Ensure color is included
              urls: imageFiles.map((file) => `/uploads/${file.filename}`),
          };
      });

      // Validate that colors exist
      if (colorImages.some((c) => !c.color)) {
          return res.status(400).json({ message: "Color field is required for all images." });
      }

        // Create shipping details object
          const shippingDetails = {
            profileName,
            country,
            postalCode,
            processingTime: {
              min: processingTimeMin,
              max: processingTimeMax,
              unit: timeUnit,
            },
            shippingService,
            deliveryTime: {
              min: deliveryTimeMin,
              max: deliveryTimeMax,
            },
            cost,
          };


      const product = new Product({
          title,
          description,
          price,
          itemadded_date,
          stock_quantity,
          category,
          categoryname,
          images: colorImages, // Store images in correct format
          shippingDetails,
          renewalOption
      });

      await product.save();
      res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};


// Fetch product grid
export const getProductGrid = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error("Error fetching product grid:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  

// Fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//Fetch my product list
export const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find().populate();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Fetch products by category
export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    console.log("Product ID:", id);
  
    try {
      // Decode the category name to handle spaces and special characters
      const decodedCategory = decodeURIComponent(category);
      console.log("Decoded category:", decodedCategory); // Log the decoded category
  
      // Find the category by name
      const categoryDoc = await Category.findOne({ name: decodedCategory });
      console.log("Category document:", categoryDoc); // Log the category document
  
      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      // Fetch products where the category matches the ObjectId
      const products = await Product.find({ category: categoryDoc._id });
      console.log("Products found:", products); // Log the products found
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found for this category" });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };


// Fetch a product by ID
// export const getProductById = async (req, res) => {
//     try {
//       const product = await Product.findById(req.params.id);
//       if (!product) return res.status(404).json({ error: "Product not found" });
//       res.json(product);
//     } catch (error) {
//       console.error("Error fetching product by ID:", error);
//       res.status(500).json({ error: "Error fetching product" });
//     }
//   };

// Update a product by ID
export const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product by ID
export const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne({ _id: id });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


//Fech product by Id to display details

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};