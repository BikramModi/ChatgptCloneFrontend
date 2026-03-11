import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Edit3, Calendar, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

import GuestNavbar from "../../components/landingComponents/Navbar";
import Footer from "../../components/landingComponents/Footer";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Summer Fashion Trends",
    excerpt:
      "Discover the hottest summer fashion trends to keep your wardrobe stylish and fresh...",
    author: "Alice Johnson",
    date: "Jan 12, 2026",
    comments: 5,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "5 Tips for a Smooth Online Shopping Experience",
    excerpt:
      "Learn how to shop smartly online, avoid scams, and find the best deals...",
    author: "Bob Smith",
    date: "Feb 2, 2026",
    comments: 12,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "How to Choose Quality Electronics",
    excerpt:
      "A guide to selecting electronics that are durable, efficient, and worth your money...",
    author: "Carol Lee",
    date: "Mar 5, 2026",
    comments: 8,
    image:
      "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?auto=format&fit=crop&w=800&q=80",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-indigo-300">

      <GuestNavbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            E-Shop Blog
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Stay updated with the latest trends, tips, and guides from E-Shop.
          </p>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-xl font-bold text-gray-800">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm">{post.excerpt}</p>

              <div className="flex justify-between items-center text-gray-500 text-sm flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Edit3 size={16} />
                  {post.author}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {post.date}
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  {post.comments}
                </div>
              </div>

              <Link
                to={`/blog/${post.id}`}
                className="mt-4 inline-block text-indigo-600 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-16 text-center rounded-t-3xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Connected with E-Shop!
          </h2>
          <p className="mb-6 opacity-90">
            Subscribe to our newsletter to get the latest updates, deals, and blogs.
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Join Now
          </Link>
        </motion.div>
      </section>

      <Footer />

    </div>
  );
};

export default BlogPage;
