# Syntax Sphere 🌐

---

## 🚀 Quick Start

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (recommended)

### Setup in VS Code

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd syntax-sphere
   ```

2. **Open in VS Code**

   ```bash
   code .
   ```

3. **Install Live Server Extension**

   - Go to Extensions (`Ctrl+Shift+X`)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

4. **Run the Site**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Browser will open at `http://127.0.0.1:5500`

### Alternative: Python HTTP Server

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## 📁 Project Structure

```
syntax-sphere/
├── index.html          # Homepage (Hero, Categories, Popular Courses)
├── courses.html        # All Courses listing with search/filter
├── course-detail.html  # Individual course page with video
├── about.html          # About Us page
├── contact.html        # Contact form page
├── css/
│   └── style.css       # All styles (variables, components, utilities)
├── js/
│   ├── data.js         # Mock data (courses, categories, testimonials)
│   └── main.js         # App logic (Store, UI Controller, Rendering)
└── README.md           # This file
```

---

## 📄 File Descriptions

| File                 | Purpose                                                                      |
| -------------------- | ---------------------------------------------------------------------------- |
| `index.html`         | Main landing page with hero section, stats, categories, and featured courses |
| `courses.html`       | Full course catalog with search and category filter                          |
| `course-detail.html` | Dynamic course page that loads content based on URL parameter                |
| `about.html`         | Company mission and core values                                              |
| `contact.html`       | Contact form with mock submission                                            |
| `css/style.css`      | Complete styling: CSS variables, layout, components, animations              |
| `js/data.js`         | All mock data including course objects with YouTube video IDs                |
| `js/main.js`         | Application logic: Cart (localStorage), Auth simulation, UI rendering        |

---

## 🎨 Customization

### Colors (in `css/style.css`)

```css
:root {
  --primary: #10b981; /* Emerald 500 */
  --primary-dark: #059669; /* Emerald 600 */
  --primary-light: #d1fae5; /* Emerald 100 */
}
```

### Adding Courses (in `js/data.js`)

```javascript
{
    id: 8,
    title: "Your Course Title",
    instructor: "Instructor Name",
    price: "FREE",
    category: "Category",
    videoId: "YOUTUBE_VIDEO_ID",
    description: "Course description...",
    features: ["Module 1", "Module 2"]
}
```
---

Made with ❤️ for learning.
