// public/js/feed.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // === Navbar (Custom for Feed) ===
  const navbar = document.createElement("nav");
  navbar.className = "navbar";

  // -- LEFT: Logo + Search --
  const navbarLeft = document.createElement("div");
  navbarLeft.className = "navbar-left";

  // Logo container
  const logoContainer = document.createElement("div");
  logoContainer.className = "navbar-brand";
  logoContainer.innerHTML = `
    <a href="index.html">
      <img class="logo" src="img/logo.png" alt="WorkMates Logo">
    </a>
  `;

  // Search bar container
  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";
  searchContainer.innerHTML = `<input type="text" placeholder="Search..." class="search-input">`;

  navbarLeft.appendChild(logoContainer);
  navbarLeft.appendChild(searchContainer);

  // -- RIGHT: Icons + Me Dropdown --
  const navbarRight = document.createElement("div");
  navbarRight.className = "navbar-icons";

  // Array of navigation items
  const navItems = [
    { icon: "fa-house", label: "Home", href: "feed.html" },
    { icon: "fa-user", label: "Profile", href: "profile.html" },
    { icon: "fa-user-group", label: "Network", href: "#" },
    { icon: "fa-suitcase", label: "Jobs", href: "#" },
    { icon: "fa-envelope", label: "Messaging", href: "#" },
    { icon: "fa-bell", label: "Notifications", href: "#" },
  ];

  // Append nav items with dividers
  navItems.forEach((item, index) => {
    if (index > 0) {
      const divider = document.createElement("div");
      divider.className = "navbar-divider";
      navbarRight.appendChild(divider);
    }
    const link = document.createElement("a");
    link.href = item.href;
    link.className = "navbar-icon";
    link.innerHTML = `<i class="fa-solid ${item.icon}"></i><span>${item.label}</span>`;
    navbarRight.appendChild(link);
  });

  // Divider before "Me" dropdown
  const dividerBeforeMe = document.createElement("div");
  dividerBeforeMe.className = "navbar-divider";
  navbarRight.appendChild(dividerBeforeMe);

  // "Me" dropdown
  const meDropdown = document.createElement("div");
  meDropdown.className = "navbar-icon me-icon";
  meDropdown.style.position = "relative";
  meDropdown.style.cursor = "pointer";
  meDropdown.innerHTML = `
    <i class="fa-solid fa-user-circle"></i>
    <span>Me <i class="fa-solid fa-caret-down" style="font-size: 0.7rem; margin-left: 4px;"></i></span>
    <div class="me-dropdown-menu" style="display:none; position:absolute; background:#fff; border:1px solid #ccc; padding:10px; border-radius:8px; top:60px; right:0px; z-index:1001; min-width: 160px;">
      <a href="#" class="dropdown-link">Admin Panel</a><br>
      <a href="#" class="dropdown-link">Settings</a><br>
      <a href="#" class="dropdown-link">Dark Mode</a>
      <hr style="margin: 8px 0;">
      <a href="#" id="signOutLink" class="dropdown-link">Sign out</a>
    </div>
  `;

  // Toggle dropdown visibility on click
  meDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    const menu = meDropdown.querySelector(".me-dropdown-menu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });
  // Hide dropdown when clicking outside
  document.addEventListener("click", () => {
    const menu = meDropdown.querySelector(".me-dropdown-menu");
    menu.style.display = "none";
  });
  navbarRight.appendChild(meDropdown);

  // Final Navbar assembly
  navbar.appendChild(navbarLeft);
  navbar.appendChild(navbarRight);
  body.appendChild(navbar);

  // === Sign Out Listener ===
  const signOutLink = document.getElementById("signOutLink");
  if (signOutLink) {
    signOutLink.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          localStorage.removeItem("user");
          window.location.href = "/login.html";
        } else {
          alert("Sign out failed.");
        }
      } catch (err) {
        console.error("Sign out error:", err);
        alert("An error occurred.");
      }
    });
  }

  // === Main Layout Wrapper (3-Column Feed Layout) ===
  const mainLayout = document.createElement("div");
  mainLayout.className = "feed-layout";
  body.appendChild(mainLayout);

  // Left Sidebar
  const leftSidebar = document.createElement("aside");
  leftSidebar.className = "feed-sidebar left";
  leftSidebar.innerHTML = `
    <div class="sidebar-box">
      <h3>Welcome, User!</h3>
      <p>View your <a href="profile.html">profile</a>, connections, and more.</p>
    </div>
  `;

  // Center Feed Content
  const feedContent = document.createElement("main");
  feedContent.className = "feed-main";

  // Post Composer (for creating new posts)
  const composer = document.createElement("div");
  composer.className = "post-composer";
  composer.innerHTML = `
    <div class="composer-top">
      <img src="img/avatar-placeholder.png" class="composer-avatar" alt="User Avatar">
      <textarea placeholder="Start a post..." class="composer-textarea"></textarea>
    </div>
    <div class="composer-actions">
      <label class="upload-btn">
        <i class="fa-solid fa-image"></i> Add Photo
        <input type="file" style="display:none;">
      </label>
      <button class="post-btn">Post</button>
    </div>
  `;

  // Container for posts
  const postsContainer = document.createElement("div");
  postsContainer.className = "posts-container";

  feedContent.appendChild(composer);
  feedContent.appendChild(postsContainer);

  // Right Sidebar
  const rightSidebar = document.createElement("aside");
  rightSidebar.className = "feed-sidebar right";
  rightSidebar.innerHTML = `
    <div class="sidebar-box">
      <h3>Suggestions</h3>
      <ul>
        <li><a href="#">People you may know</a></li>
        <li><a href="#">Recommended jobs</a></li>
        <li><a href="#">Trends</a></li>
      </ul>
    </div>
  `;

  // Assemble the 3-column layout
  mainLayout.appendChild(leftSidebar);
  mainLayout.appendChild(feedContent);
  mainLayout.appendChild(rightSidebar);
});
