// Pages/zustand/Blog_page.js
import { create } from "zustand";

const blogPageData = create((set, get) => ({
  blogs: [],             // All blogs from API
  filteredData: [],      // Blogs to render (same as blogs for server-side filtering)
  activeCategory: "",    // Currently selected category filter
  searchQuery: "",       // Currently typed search query

  // ========== SET BLOGS FROM API ==========
  setBlogs: (val) => set({ blogs: val, filteredData: val }),

  // ========== SET CATEGORY FILTER ==========
  setCategoryFilter: (category) => set({ activeCategory: category }),

  // ========== SET SEARCH QUERY ==========
  setSearchQuery: (query) => set({ searchQuery: query }),

  // ========== RESET ALL FILTERS ==========
  resetFilters: () =>
    set({ activeCategory: "", searchQuery: "" }),
}));

export default blogPageData;
