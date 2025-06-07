import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./BlogsStories.css";

import BannerImg from "../../assets/images/blog1.jpg";
import ArtisanStoryImg from "../../assets/images/artisan-story.jpeg";
import CraftHistoryImg from "../../assets/images/craft-history.jpeg";
import PublishArticleImg from "../../assets/images/publish-article.jpg";
import Blog1Img from "../../assets/images/blog2.jpeg";
import Blog2Img from "../../assets/images/blog3.jpeg";

const defaultArticleImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23E9ECEF'/%3E%3Ctext x='50%' y='50%' fill='%236C757D' dy='.3em' font-family='sans-serif' font-size='16px' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
const API_BASE_URL = "http://localhost:5000/api";

Modal.setAppElement('#root');

const styles = {
  section: {
    padding: '50px 20px',
    marginBottom: '30px',
    borderBottom: '1px solid #eee',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.2rem',
    marginBottom: '40px',
    color: '#333',
    fontWeight: '600',
  },
  textContainer: {
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.7',
    color: '#555',
  },
  button: {
    padding: '12px 25px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#8B4513',
    color: 'white',
    marginTop: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '1rem',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#444',
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out',
  },
  blogCardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  blogCardContent: {
    padding: '20px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  blogCardTitle: {
    fontSize: '1.4rem',
    marginBottom: '10px',
    color: '#333',
  },
  blogCardText: {
    fontSize: '0.95rem',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '15px',
    flexGrow: 1,
  },
  sectionContentFlex: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  },
  sectionContentFlexReverse: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    flexDirection: 'row-reverse',
  },
  sectionImage: {
    flex: '1 1 40%',
    maxWidth: '450px',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  sectionTextContent: {
    flex: '1 1 60%',
  }
};


const BlogsStories = () => {
  const initialFormData = {
    title: "",
    category: "artisan-story",
    content: "",
    image: null,
    previewImage: null
  };
  const [formData, setFormData] = useState(initialFormData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  const [fetchedArticles, setFetchedArticles] = useState([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [articleError, setArticleError] = useState(null);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState({ text: "", type: "" });
  const [isSubscribing, setIsSubscribing] = useState(false);

  const [isSubmittingArticle, setIsSubmittingArticle] = useState(false);
  const [submitArticleMessage, setSubmitArticleMessage] = useState({ text: "", type: "" });

  const staticStories = {
    artisanStory: {
      title: "Featured Artisan Story",
      shortContent: "Meet Kamala, a third-generation Beeralu lace maker from Galle. Discover how she keeps this intricate craft alive despite modern challenges.",
      content: `<p>Meet Kamala, a third-generation Beeralu lace maker from Galle. Discover how she keeps this intricate craft alive despite modern challenges and how Ceylon Creations helped her reach global markets.</p><p>Kamala learned the art of Beeralu lace from her grandmother when she was just 12 years old. The delicate patterns and precise movements required years of practice to master. "When I was young, every girl in our village learned this craft," Kamala recalls. "But now, only a handful of us remain."</p><p>The challenges facing traditional artisans like Kamala are numerous. Cheap machine-made imitations flood the market, younger generations are less interested in learning time-consuming crafts, and the materials become harder to source. "There was a time I thought about giving up," Kamala admits.</p><p>That's when Ceylon Creations entered the picture. Through our platform, Kamala's exquisite lacework found an international audience appreciative of authentic craftsmanship. "Now I can support my family doing what I love," she says with a smile. "And I'm teaching my daughter, so the tradition continues."</p><p>Kamala's story is just one of many. Through Ceylon Creations, we're working to preserve these cultural treasures by connecting artisans with customers who value true craftsmanship.</p>`,
      image: ArtisanStoryImg
    },
    craftHistory: {
      title: "The Rich History of Sri Lankan Crafts",
      shortContent: "Explore the centuries-old traditions behind Sri Lanka's most iconic handicrafts - from Beeralu lace to coir products.",
      content: `<p>Explore the centuries-old traditions behind Sri Lanka's most iconic handicrafts - from the delicate Beeralu lace to the sturdy coir products. Learn how these crafts evolved and their cultural significance in Sri Lankan society.</p><p>Sri Lankan handicrafts have a history that spans over 2,500 years, with roots in ancient kingdoms and colonial influences. The island's strategic location along ancient trade routes brought diverse cultural influences that enriched its craft traditions.</p><p><strong>Beeralu Lace:</strong> Introduced by the Portuguese in the 16th century, this intricate lace-making technique was adapted by local artisans who incorporated traditional Sinhalese motifs. The craft flourished during Dutch and British rule, becoming a prized export.</p><p><strong>Coir Products:</strong> Made from coconut fiber, coir crafts date back to ancient times when they were used for ropes and mats in fishing communities. Today, they represent sustainable craftsmanship at its finest.</p><p><strong>Wood Carving:</strong> The ancient cities of Anuradhapura and Polonnaruwa showcase the magnificent wood carving traditions that once adorned temples and palaces. Today's artisans preserve these techniques in furniture and decorative items.</p><p><strong>Pottery:</strong> With origins in early settlements, traditional pottery methods continue in villages like Molagoda, where generations of potters create both functional and artistic pieces.</p><p>Each craft tells a story - of royal patronage, colonial trade, village life, and cultural identity. At Ceylon Creations, we're honored to help preserve these living traditions by supporting the artisans who keep them alive.</p>`,
      image: CraftHistoryImg
    },
    sustainableCrafts: {
      id: 'static-sustainable',
      title: "Sustainable Practices in Traditional Crafts",
      shortContent: "How Sri Lankan artisans are adapting eco-friendly methods while preserving traditional techniques.",
      content: `<p>How Sri Lankan artisans are adapting eco-friendly methods while preserving traditional techniques.</p><p>In the face of global environmental challenges, Sri Lanka's artisan communities are leading a quiet revolution by blending ancient wisdom with modern sustainability practices.</p><p><strong>Natural Dyes:</strong> Many textile artisans have returned to traditional plant-based dyes, avoiding synthetic chemicals. Turmeric, indigo, and tea leaves create vibrant colors while being environmentally friendly.</p><p><strong>Upcycling:</strong> Resourceful crafters transform waste materials into beautiful products. Coconut shells become lamps, discarded saris are woven into rugs, and palm leaves are crafted into baskets.</p><p><strong>Sustainable Materials:</strong> Artisans increasingly source materials responsibly. Wood comes from managed plantations, clay from approved pits, and fibers from renewable sources.</p><p><strong>Energy Efficiency:</strong> Traditional methods often require less energy than industrial processes. Solar drying racks and energy-conserving kiln designs are becoming more common.</p><p>These sustainable practices not only protect the environment but often result in higher quality, more unique products. "Our ancestors worked in harmony with nature," explains master weaver Sunil. "We're rediscovering that balance."</p><p>By supporting these eco-conscious artisans, customers become part of a movement that values both cultural heritage and environmental stewardship.</p>`,
      image: Blog1Img
    },
    craftRevival: {
      id: 'static-revival',
      title: "Reviving Forgotten Crafts",
      shortContent: "The story of how young artisans are bringing back nearly extinct crafts with modern twists.",
      content: `<p>The story of how young artisans are bringing back nearly extinct crafts with modern twists.</p><p>Across Sri Lanka, a new generation is breathing life into crafts that were on the verge of disappearing. These young innovators honor tradition while adapting it for contemporary markets.</p><p><strong>Laksha:</strong> This nearly lost art of decorative lacquer work is being revived by artists like 28 year old Priyantha. He combines traditional motifs with modern designs on everything from jewelry boxes to smartphone cases.</p><p><strong>Dumbara Weaving:</strong> Once limited to small mats, this distinctive patterned weaving is now appearing on fashion accessories thanks to design graduates working with village elders.</p><p><strong>Traditional Masks:</strong> While maintaining sacred Kolam mask carving techniques, young artisans are creating smaller versions for home decor and experimenting with new color palettes.</p><p>The revival movement faces challenges. "Many techniques weren't properly documented," explains artisan and researcher Nadeeka. "We're piecing together methods from elderly practitioners and museum pieces."</p><p>Technology plays a surprising role in this traditional craft revival. Social media connects artisans with global markets, while online platforms facilitate knowledge sharing between generations.</p><p>"We're not just preserving the past," says young potter Anjali. "We're showing how these crafts can be part of Sri Lanka's future."</p>`,
      image: Blog2Img
    }
  };

  const handleApiError = async (response) => {
    let errorData = { message: `Request failed with status: ${response.status}` };
    try {
      const jsonError = await response.json();
      errorData.message = jsonError.message || errorData.message;
    } catch (jsonParseException) {
      const textError = await response.text();
      errorData.message = textError.substring(0, 300) + (textError.length > 300 ? "..." : "");
      console.error("Non-JSON error response from server:", textError);
    }
    return errorData.message;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoadingArticles(true);
      setArticleError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/articles`);
        if (!response.ok) {
          const errorMessage = await handleApiError(response);
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setFetchedArticles(data);
      } catch (error) {
        console.error("Detailed error fetching articles:", error);
        setArticleError(error.message);
      } finally {
        setIsLoadingArticles(false);
      }
    };
    fetchArticles();
  }, []);

  const openStoryModal = (storyData) => {
    setCurrentStory(storyData);
    setModalIsOpen(true);
  };

  const closeStoryModal = () => {
    setModalIsOpen(false);
    setCurrentStory(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitArticleMessage({ text: "File is too large. Max 5MB allowed.", type: "error" });
        e.target.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: file, previewImage: reader.result }));
      };
      reader.readAsDataURL(file);
      setSubmitArticleMessage({ text: "", type: "" });
    }
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
        setSubmitArticleMessage({ text: "Title and Content are required.", type: "error" });
        return;
    }
    setIsSubmittingArticle(true);
    setSubmitArticleMessage({ text: "", type: "" });

    const articlePayload = new FormData();
    articlePayload.append('title', formData.title);
    articlePayload.append('category', formData.category);
    articlePayload.append('content', formData.content);
    if (formData.image) {
      articlePayload.append('image', formData.image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: "POST",
        body: articlePayload,
      });

      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setSubmitArticleMessage({ text: result.message || "Article submitted for review!", type: "success" });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Detailed error submitting article:", error);
      setSubmitArticleMessage({ text: error.message || "Failed to submit article. Please try again.", type: "error" });
    } finally {
      setIsSubmittingArticle(false);
    }
  };

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
        setNewsletterMessage({ text: "Please enter your email address.", type: "error" });
        return;
    }
    setIsSubscribing(true);
    setNewsletterMessage({ text: "", type: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (!response.ok) {
        const errorMessage = await handleApiError(response);
        throw new Error(errorMessage);
      }
      const result = await response.json();
      setNewsletterMessage({ text: result.message || "Successfully subscribed!", type: "success" });
      setNewsletterEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setNewsletterMessage({ text: error.message || "Subscription failed. Please try again.", type: "error" });
    } finally {
      setIsSubscribing(false);
    }
  };

  const allLatestArticles = [
    staticStories.sustainableCrafts,
    staticStories.craftRevival,
    ...fetchedArticles.map(article => ({
        id: article._id,
        title: article.title,
        shortContent: article.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + (article.content.replace(/<[^>]*>?/gm, '').length > 120 ? "..." : ""),
        content: article.content,
        image: article.image || defaultArticleImage
    }))
  ];

  return (
    <>
      <div className="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="banner-overlay">
          <h1 className="fade-in">Blogs & Stories</h1>
          <p className="slide-in">Preserving Heritage Through Words</p>
        </div>
      </div>

      <div className="blogs-stories-content-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={styles.section}>
          <div style={styles.sectionContentFlex}>
            <img src={staticStories.artisanStory.image} alt={staticStories.artisanStory.title} style={styles.sectionImage} className="fade-up" />
            <div style={styles.sectionTextContent}>
              <h2 style={{ ...styles.sectionTitle, textAlign: 'left', fontSize: '2rem', marginBottom: '15px' }}>{staticStories.artisanStory.title}</h2>
              <p style={{color: '#555', lineHeight: '1.7', marginBottom: '20px'}}>{staticStories.artisanStory.shortContent}</p>
              <button style={styles.button} onClick={() => openStoryModal(staticStories.artisanStory)}>Read Full Story</button>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionContentFlexReverse}>
             <img src={staticStories.craftHistory.image} alt={staticStories.craftHistory.title} style={styles.sectionImage} className="fade-up" />
            <div style={styles.sectionTextContent}>
              <h2 style={{ ...styles.sectionTitle, textAlign: 'left', fontSize: '2rem', marginBottom: '15px' }}>{staticStories.craftHistory.title}</h2>
              <p style={{color: '#555', lineHeight: '1.7', marginBottom: '20px'}}>{staticStories.craftHistory.shortContent}</p>
              <button style={styles.button} onClick={() => openStoryModal(staticStories.craftHistory)}>Explore History</button>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Latest Blogs</h2>
          {isLoadingArticles && <p style={{textAlign: 'center', margin: '20px 0'}}>Loading articles...</p>}
          {articleError && <p className="error-message" style={{color: 'red', textAlign: 'center', margin: '20px 0'}}>Error loading articles: {articleError}</p>}
          {!isLoadingArticles && !articleError && allLatestArticles.length === 0 && (
            <p style={{textAlign: 'center', margin: '30px 0', fontSize: '1.1rem', color: '#777'}}>No articles available at the moment. Check back soon!</p>
          )}
          <div className="blogs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {allLatestArticles.map(article => (
              <div key={article.id} style={styles.blogCard} className="blog-card slide-up">
                <img
                    src={article.image || defaultArticleImage}
                    alt={article.title}
                    style={styles.blogCardImage}
                    onError={(e) => { e.target.onerror = null; e.target.src = defaultArticleImage; }}
                />
                <div style={styles.blogCardContent}>
                  <div>
                    <h3 style={styles.blogCardTitle}>{article.title}</h3>
                    <p style={styles.blogCardText}>{article.shortContent}</p>
                  </div>
                  <button
                    style={{...styles.button, alignSelf: 'flex-start' }}
                    onClick={() => openStoryModal({
                        title: article.title,
                        content: article.content,
                        image: article.image || defaultArticleImage
                    })}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{...styles.section, backgroundColor: '#f9f9f9', borderRadius: '8px'}}>
           <div style={styles.sectionContentFlex}>
            <div style={{...styles.sectionTextContent, flexBasis: '50%'}}>
              <h2 style={{ ...styles.sectionTitle, textAlign: 'left', fontSize: '2rem', marginBottom: '20px' }}>Share Your Story</h2>
              <p style={{color: '#555', lineHeight: '1.7', marginBottom: '30px'}}>
                Contribute to our platform by sharing your experiences, artisan stories,
                or craft knowledge. Your article will be reviewed by our team before publishing.
              </p>
              <form onSubmit={handleArticleSubmit} className="article-form">
                <div style={styles.formGroup}>
                  <label htmlFor="title" style={styles.label}>Article Title*</label>
                  <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required style={styles.input} />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="category" style={styles.label}>Category*</label>
                  <select id="category" name="category" value={formData.category} onChange={handleChange} required style={styles.input} >
                    <option value="artisan-story">Artisan Story</option>
                    <option value="craft-technique">Craft Technique</option>
                    <option value="cultural-heritage">Cultural Heritage</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="content" style={styles.label}>Article Content*</label>
                  <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="6" placeholder="Share your story or knowledge here..." required style={{...styles.input, minHeight: '120px'}} />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="image-upload" style={styles.label}>Featured Image (Optional, Max 5MB)</label>
                  <input type="file" id="image-upload" name="image-upload-input" accept="image/*" onChange={handleImageChange} style={{...styles.input, padding: '8px'}}/>
                  {formData.previewImage && (
                    <div className="image-preview" style={{ marginTop: '15px', marginBottom: '15px', border: '1px dashed #ccc', padding: '10px', borderRadius: '4px' }}>
                      <img src={formData.previewImage} alt="Preview" style={{maxWidth: '100%', height: 'auto', display: 'block', maxHeight: '200px', margin: '0 auto'}} />
                    </div>
                  )}
                </div>

                {submitArticleMessage.text && (
                  <p
                    className={`form-message ${submitArticleMessage.type}`}
                    style={{
                      color: submitArticleMessage.type === 'error' ? '#D8000C' : '#4F8A10',
                      backgroundColor: submitArticleMessage.type === 'error' ? '#FFD2D2' : '#DFF2BF',
                      padding: '10px',
                      borderRadius: '4px',
                      marginTop: '15px',
                      marginBottom: '20px',
                      border: `1px solid ${submitArticleMessage.type === 'error' ? '#D8000C' : '#4F8A10'}`
                    }}
                  >
                    {submitArticleMessage.text}
                  </p>
                )}

                <button type="submit" style={{...styles.button, width: '100%', fontSize: '1.1rem'}} disabled={isSubmittingArticle}>
                  {isSubmittingArticle ? "Submitting..." : "Submit Article"}
                </button>
              </form>
            </div>
             <img src={PublishArticleImg} alt="Publish Article" style={{...styles.sectionImage, flexBasis: '50%'}} className="fade-up" />
          </div>
        </section>

        <section style={{...styles.section, textAlign: 'center', borderBottom: 'none', backgroundColor: '#333', color: 'white', borderRadius: '8px', padding: '60px 20px'}}>
          <h2 style={{...styles.sectionTitle, color: 'white', fontSize: '2rem'}}>Stay Updated</h2>
          <p style={{maxWidth: '600px', margin: '0 auto 30px auto', color: '#f0f0f0', lineHeight: '1.6'}}>Subscribe to our newsletter for new stories and blog updates.</p>
          <form onSubmit={handleNewsletterSubscribe} className="newsletter-form" style={{display: 'flex', justifyContent: 'center', gap: '10px', maxWidth: '500px', margin: '0 auto'}}>
            <input type="email" placeholder="Your email address" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required style={{...styles.input, marginBottom: '0', flexGrow: 1}}/>
            <button type="submit" style={{...styles.button, backgroundColor: '#A0522D' }} disabled={isSubscribing}>
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {newsletterMessage.text && (
            <p className={`newsletter-message ${newsletterMessage.type}`} style={{
                color: newsletterMessage.type === 'error' ? '#FFBABA' : '#DFF2BF',
                marginTop: '20px',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: newsletterMessage.type === 'error' ? '#D8000C' : '#4F8A10',
            }}>
              {newsletterMessage.text}
            </p>
          )}
        </section>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeStoryModal} contentLabel="Story Modal" className="story-modal" overlayClassName="story-modal-overlay"
        style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '800px',
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                border: 'none',
            },
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)'
            }
        }}
      >
        {currentStory && (
          <div className="modal-content">
            <button className="close-modal" onClick={closeStoryModal} style={{position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.8rem', cursor: 'pointer', color: '#777'}}> × </button>
            <h2 style={{fontSize: '2rem', marginBottom: '20px', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>{currentStory.title}</h2>
            <img src={currentStory.image || defaultArticleImage} alt={currentStory.title} onError={(e) => { e.target.onerror = null; e.target.src = defaultArticleImage; }} style={{width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '6px', marginBottom: '25px'}}/>
            <div dangerouslySetInnerHTML={{ __html: currentStory.content }} style={{lineHeight: '1.8', color: '#444'}}/>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BlogsStories;