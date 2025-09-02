# GitHub Resume

A customizable, professional resume website that integrates with your GitHub profile to showcase your development skills, projects, and contributions.

## ✨ Features

- **Responsive Design**: Looks great on all devices
- **GitHub Integration**: Automatically displays your GitHub stats and contribution chart
- **Professional Layout**: Clean, modern design with customizable sections
- **Easy Customization**: Simple HTML/CSS structure for quick personalization
- **Font Awesome Icons**: Beautiful icons throughout the resume
- **Print-Friendly**: Optimized for printing

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/your-username/resume.git
cd resume
```

### 2. Customize Your Information

Edit the following files to personalize your resume:

#### `index.html`
- Replace `[Your Full Name]` with your actual name
- Update contact information (email, location, GitHub, LinkedIn)
- Modify the professional summary in the "About Me" section
- Add your actual work experience, projects, and education

#### `script.js`
- Change `GITHUB_USERNAME` from `'your-username'` to your actual GitHub username
- Example: `const GITHUB_USERNAME = 'octocat';`

### 3. Preview Locally

Open `index.html` in your web browser to see your resume.

## 📁 File Structure

```
resume/
├── index.html          # Main resume page
├── styles.css          # Styling and layout
├── script.js           # GitHub API integration
├── README.md           # This file
└── LICENSE             # MIT License
```

## 🎨 Customization Guide

### Personal Information
Update the profile section in `index.html`:

```html
<h1 class="name">John Doe</h1>
<p class="title">Full Stack Developer</p>
```

### Contact Information
Update the contact details:

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>john.doe@example.com</span>
</div>
```

### Skills Section
Customize your technical skills:

```html
<span class="skill-tag">JavaScript</span>
<span class="skill-tag">React</span>
<span class="skill-tag">Node.js</span>
```

### Experience Section
Add your work experience:

```html
<div class="experience-item">
    <div class="experience-header">
        <h3>Senior Developer</h3>
        <span class="company">Tech Company Inc.</span>
        <span class="duration">2020 - Present</span>
    </div>
    <ul class="experience-details">
        <li>Led development of key features</li>
        <li>Mentored junior developers</li>
    </ul>
</div>
```

### Projects Section
Showcase your GitHub projects:

```html
<div class="project-card">
    <h3>Project Name</h3>
    <p class="project-description">
        A brief description of your project and its impact.
    </p>
    <div class="project-tech">
        <span class="tech-tag">React</span>
        <span class="tech-tag">Node.js</span>
    </div>
</div>
```

## 🌐 Deployment

### GitHub Pages (Free)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial resume setup"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "GitHub Pages" section
   - Select "main" branch as source
   - Your resume will be live at `https://your-username.github.io/resume/`

### Other Hosting Options

- **Netlify**: Drag and drop the files or connect your GitHub repo
- **Vercel**: Connect your GitHub repository for automatic deployments
- **AWS S3 + CloudFront**: For more advanced hosting needs

## 🔧 Advanced Features

### GitHub API Integration

The resume automatically fetches:
- Number of public repositories
- Follower count
- Following count
- Stars received on your repositories
- Contribution chart visualization

### Contribution Chart

Uses [GitHub Chart API](https://ghchart.rshah.org/) to display your contribution activity.

## 📱 Responsive Design

The resume is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Theming

To change the color scheme (now matched to `vincentviitala.com`), modify the CSS variables in `styles.css`:

```css
:root {
    --bg: #0b0f14;
    --bg-accent: #0f1520;
    --card: #0f1724;
    --muted: #9fb0c4;
    --text: #e6edf3;
    --brand: #2bb673;    /* primary green */
    --brand-2: #5eb6ff;  /* secondary blue */
    --ring: rgba(91, 180, 106, 0.35);
    --shadow: rgba(0,0,0,0.4);
}

Typography is powered by Inter via Google Fonts in `index.html`.
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: GitHub API integration
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help customizing your resume, feel free to:
- Open an issue on GitHub
- Reach out via email
- Check the customization guide above

---

**Happy coding! 🚀**
