import React, { useState } from "react";
import Modal from "react-modal";
import "./BlogsStories.css";
import BannerImg from "../../assets/images/blog1.jpg";
import ArtisanStoryImg from "../../assets/images/artisan-story.jpeg";
import CraftHistoryImg from "../../assets/images/craft-history.jpeg";
import Blog1Img from "../../assets/images/blog2.jpeg";
import Blog2Img from "../../assets/images/blog3.jpeg";
import PublishArticleImg from "../../assets/images/publish-article.jpg";

const BlogsStories = () => {
  // State for the article publishing form
  const [formData, setFormData] = useState({
    title: "",
    category: "artisan-story",
    content: "",
    image: null,
    previewImage: null
  });

  // State for story modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  Modal.setAppElement('#root');

  const stories = {
    artisanStory: {
      title: "Featured Artisan Story",
      content: `
        <p>Meet Kamala, a third-generation Beeralu lace maker from Galle. Discover how she keeps this intricate craft alive despite modern challenges and how Ceylon Creations helped her reach global markets.</p>
        <p>Kamala learned the art of Beeralu lace from her grandmother when she was just 12 years old. The delicate patterns and precise movements required years of practice to master. "When I was young, every girl in our village learned this craft," Kamala recalls. "But now, only a handful of us remain."</p>
        <p>The challenges facing traditional artisans like Kamala are numerous. Cheap machine-made imitations flood the market, younger generations are less interested in learning time-consuming crafts, and the materials become harder to source. "There was a time I thought about giving up," Kamala admits.</p>
        <p>That's when Ceylon Creations entered the picture. Through our platform, Kamala's exquisite lacework found an international audience appreciative of authentic craftsmanship. "Now I can support my family doing what I love," she says with a smile. "And I'm teaching my daughter, so the tradition continues."</p>
        <p>Kamala's story is just one of many. Through Ceylon Creations, we're working to preserve these cultural treasures by connecting artisans with customers who value true craftsmanship.</p>
      `,
      image: ArtisanStoryImg
    },
    craftHistory: {
      title: "The Rich History of Sri Lankan Crafts",
      content: `
        <p>Explore the centuries-old traditions behind Sri Lanka's most iconic handicrafts - from the delicate Beeralu lace to the sturdy coir products. Learn how these crafts evolved and their cultural significance in Sri Lankan society.</p>
        <p>Sri Lankan handicrafts have a history that spans over 2,500 years, with roots in ancient kingdoms and colonial influences. The island's strategic location along ancient trade routes brought diverse cultural influences that enriched its craft traditions.</p>
        <p><strong>Beeralu Lace:</strong> Introduced by the Portuguese in the 16th century, this intricate lace-making technique was adapted by local artisans who incorporated traditional Sinhalese motifs. The craft flourished during Dutch and British rule, becoming a prized export.</p>
        <p><strong>Coir Products:</strong> Made from coconut fiber, coir crafts date back to ancient times when they were used for ropes and mats in fishing communities. Today, they represent sustainable craftsmanship at its finest.</p>
        <p><strong>Wood Carving:</strong> The ancient cities of Anuradhapura and Polonnaruwa showcase the magnificent wood carving traditions that once adorned temples and palaces. Today's artisans preserve these techniques in furniture and decorative items.</p>
        <p><strong>Pottery:</strong> With origins in early settlements, traditional pottery methods continue in villages like Molagoda, where generations of potters create both functional and artistic pieces.</p>
        <p>Each craft tells a story - of royal patronage, colonial trade, village life, and cultural identity. At Ceylon Creations, we're honored to help preserve these living traditions by supporting the artisans who keep them alive.</p>
      `,
      image: CraftHistoryImg
    },
    sustainableCrafts: {
      title: "Sustainable Practices in Traditional Crafts",
      content: `
        <p>How Sri Lankan artisans are adapting eco-friendly methods while preserving traditional techniques.</p>
        <p>In the face of global environmental challenges, Sri Lanka's artisan communities are leading a quiet revolution by blending ancient wisdom with modern sustainability practices.</p>
        <p><strong>Natural Dyes:</strong> Many textile artisans have returned to traditional plant-based dyes, avoiding synthetic chemicals. Turmeric, indigo, and tea leaves create vibrant colors while being environmentally friendly.</p>
        <p><strong>Upcycling:</strong> Resourceful crafters transform waste materials into beautiful products. Coconut shells become lamps, discarded saris are woven into rugs, and palm leaves are crafted into baskets.</p>
        <p><strong>Sustainable Materials:</strong> Artisans increasingly source materials responsibly. Wood comes from managed plantations, clay from approved pits, and fibers from renewable sources.</p>
        <p><strong>Energy Efficiency:</strong> Traditional methods often require less energy than industrial processes. Solar drying racks and energy-conserving kiln designs are becoming more common.</p>
        <p>These sustainable practices not only protect the environment but often result in higher quality, more unique products. "Our ancestors worked in harmony with nature," explains master weaver Sunil. "We're rediscovering that balance."</p>
        <p>By supporting these eco-conscious artisans, customers become part of a movement that values both cultural heritage and environmental stewardship.</p>
      `,
      image: Blog1Img
    },
    craftRevival: {
      title: "Reviving Forgotten Crafts",
      content: `
        <p>The story of how young artisans are bringing back nearly extinct crafts with modern twists.</p>
        <p>Across Sri Lanka, a new generation is breathing life into crafts that were on the verge of disappearing. These young innovators honor tradition while adapting it for contemporary markets.</p>
        <p><strong>Laksha:</strong> This nearly lost art of decorative lacquer work is being revived by artists like 28 year old Priyantha. He combines traditional motifs with modern designs on everything from jewelry boxes to smartphone cases.</p>
        <p><strong>Dumbara Weaving:</strong> Once limited to small mats, this distinctive patterned weaving is now appearing on fashion accessories thanks to design graduates working with village elders.</p>
        <p><strong>Traditional Masks:</strong> While maintaining sacred Kolam mask carving techniques, young artisans are creating smaller versions for home decor and experimenting with new color palettes.</p>
        <p>The revival movement faces challenges. "Many techniques weren't properly documented," explains artisan and researcher Nadeeka. "We're piecing together methods from elderly practitioners and museum pieces."</p>
        <p>Technology plays a surprising role in this traditional craft revival. Social media connects artisans with global markets, while online platforms facilitate knowledge sharing between generations.</p>
        <p>"We're not just preserving the past," says young potter Anjali. "We're showing how these crafts can be part of Sri Lanka's future."</p>
      `,
      image: Blog2Img
    }
  };

  const openStoryModal = (storyContent) => {
    setCurrentStory(storyContent);
    setModalIsOpen(true);
  };

  const closeStoryModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          previewImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Article submitted:", formData);
    alert("Article submitted for review! Thank you for your contribution.");
    // Reset form
    setFormData({
      title: "",
      category: "artisan-story",
      content: "",
      image: null,
      previewImage: null
    });
  };

  return (
    <div className="blogs-stories">
      {/* Banner Section */}
      <div className="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="banner-overlay">
          <h1 className="fade-in">Blogs & Stories</h1>
          <p className="slide-in">Preserving Heritage Through Words</p>
        </div>
      </div>

      {/* Featured Story Section */}
      <section className="featured-story section">
        <div className="section-content">
          <img src={ArtisanStoryImg} alt="Artisan Story" className="fade-up" />
          <div className="text-content">
            <h2>Featured Artisan Story</h2>
            <p>
              Meet Kamala, a third-generation Beeralu lace maker from Galle. 
              Discover how she keeps this intricate craft alive despite modern 
              challenges and how Ceylon Creations helped her reach global markets.
            </p>
            <button className="read-more-btn" onClick={() => openStoryModal(stories.artisanStory)}>Read Full Story</button>
          </div>
        </div>
      </section>

      {/* Craft History Section */}
      <section className="craft-history section">
        <div className="section-content reverse">
          <div className="text-content">
            <h2>The Rich History of Sri Lankan Crafts</h2>
            <p>
              Explore the centuries-old traditions behind Sri Lanka's most 
              iconic handicrafts - from the delicate Beeralu lace to the sturdy 
              coir products. Learn how these crafts evolved and their cultural 
              significance in Sri Lankan society.
            </p>
            <button className="read-more-btn" onClick={() => openStoryModal(stories.craftHistory)}>Explore History</button>
          </div>
          <img src={CraftHistoryImg} alt="Craft History" className="fade-up" />
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="latest-blogs section">
        <h2>Latest Blogs</h2>
        <div className="blogs-grid">
          <div className="blog-card slide-up">
            <img src={Blog1Img} alt="Sustainable Crafts" />
            <div className="blog-content">
              <h3>Sustainable Practices in Traditional Crafts</h3>
              <p>
                How Sri Lankan artisans are adapting eco-friendly methods 
                while preserving traditional techniques.
              </p>
              <button className="read-more-btn" onClick={() => openStoryModal(stories.sustainableCrafts)}>Read More</button>
            </div>
          </div>
          <div className="blog-card slide-up">
            <img src={Blog2Img} alt="Craft Revival" />
            <div className="blog-content">
              <h3>Reviving Forgotten Crafts</h3>
              <p>
                The story of how young artisans are bringing back nearly 
                extinct crafts with modern twists.
              </p>
              <button className="read-more-btn" onClick={() => openStoryModal(stories.craftRevival)}>Read More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Publish Article Section */}
      <section className="publish-article section">
        <div className="section-content">
          <img src={PublishArticleImg} alt="Publish Article" className="fade-up" />
          <div className="text-content">
            <h2>Share Your Story</h2>
            <p>
              Contribute to our platform by sharing your experiences, artisan stories, 
              or craft knowledge. Your article will be reviewed by our team before publishing.
            </p>
            
            <form onSubmit={handleSubmit} className="article-form">
              <div className="form-group">
                <label htmlFor="title">Article Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="artisan-story">Artisan Story</option>
                  <option value="craft-technique">Craft Technique</option>
                  <option value="cultural-heritage">Cultural Heritage</option>
                  <option value="sustainability">Sustainability</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="content">Article Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="8"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="image">Featured Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {formData.previewImage && (
                  <div className="image-preview">
                    <img src={formData.previewImage} alt="Preview" />
                  </div>
                )}
              </div>
              
              <button type="submit" className="submit-btn">
                Submit Article
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for new stories and blog updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Story Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeStoryModal}
        contentLabel="Story Modal"
        className="story-modal"
        overlayClassName="story-modal-overlay"
      >
        {currentStory && (
          <div className="modal-content">
            <button className="close-modal" onClick={closeStoryModal}>
              &times;
            </button>
            <h2>{currentStory.title}</h2>
            <img src={currentStory.image} alt={currentStory.title} />
            <div dangerouslySetInnerHTML={{ __html: currentStory.content }} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogsStories;
