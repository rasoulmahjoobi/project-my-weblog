//مشخص کردن آیدی(کدام بلاگ است)
const API_BASE = "https://6a1ea7dfb79eec0d6cefcdfd.mockapi.io/api/blog-info";
const blogId = new URLSearchParams(window.location.search).get("id");
const app = document.getElementById("app");

//تابع کمکی برای ساخت عناصر
function el(tag, { className, text, attrs } = {}) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    if (attrs) {
        Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    }
    return node;
}

//ساخت و نمایش کامل صفحه
function renderBlog(blog) {
    app.innerHTML = "";

    //back
    const back = el("a", {
        className: "text-sky-400 text-lg font-medium hover:underline inline-block mb-6",
        text: "← Back",
        attrs: { href: "index.html" },
    });

    //title
    const title = el("h1", {
        className: "text-3xl md:text-5xl font-bold text-white mb-4 leading-tight",
        text: blog.title || "No Title",
    });

    //date
    const dateP = el("p", {
        className: "text-slate-400 text-base md:text-lg font-semibold mb-6",
    });
    dateP.appendChild(document.createTextNode("Published: "));
    dateP.appendChild(
        el("span", {
            className: "text-slate-300",
            text: blog.date || "",
        })
    );

    //image
    let imageWrap = null;
    if (blog.image && String(blog.image).trim() !== "") {
        imageWrap = el("div", { className: "mb-6 rounded-3xl overflow-hidden" });

        const img = el("img", {
            className: "w-full h-64 md:h-80 object-cover",
            attrs: {
                src: blog.image,
                alt: blog.title ? `${blog.title} image` : "Blog image",
            },
        });

        imageWrap.appendChild(img);
    }

    //description
    const content = el("div", {
        className: "mt-10 text-slate-300 text-base md:text-lg leading-8 font-medium whitespace-pre-wrap",
    });

    if (blog.description && String(blog.description).trim() !== "") {
        content.textContent = blog.description;
    } else {
        content.textContent = "No description.";
        content.className += " text-slate-400";
    }

    //چیدن در صفحه
    app.appendChild(back);
    app.appendChild(title);
    app.appendChild(dateP);
    if (imageWrap) app.appendChild(imageWrap);
    app.appendChild(content);
}

//تابع اصلی دریافت اطلاعات
async function getBlogDetails() {
    if (!blogId) {
        renderError("Blog id not found.");
        return;
    }
    try {
        const res = await fetch(`${API_BASE}/${blogId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const blog = await res.json();
        renderBlog(blog);
    } catch (err) {
        console.error(err);
        renderError("Failed to load blog details. Please try again.");
    }
}

getBlogDetails();
