// اضافه کردن آرگومان query که به صورت پیش‌فرض خالی است
async function getBlog(query = "") {
    const boxBlog = document.getElementById("box-blog");

    try {
        // تغییر آدرس API برای پشتیبانی از سرچ
        let url = "https://6a1ea7dfb79eec0d6cefcdfd.mockapi.io/api/blog-info";
        if (query) {
            url += `?search=${query}`;
        }

        const response = await fetch(url);
        const blog = await response.json();

        let blogResult = ``;
        blog.forEach(b => {
            blogResult += `
                <div class="bg-slate-600 w-full p-3 m-3 h-40 lg:p-5 lg:m-5 lg:h-52 rounded-3xl">
                    <h1 class="text-slate-50 text-3xl">${b.title}</h1>
                    <p class="text-slate-300 text-lg line-clamp-1">
                        ${b.description}
                    </p>
                    <div class="my-3 lg:my-8">
                        <p class="text-slate-300 text-base pb-1">
                            <span class="text-cyan-400 text-xs">${b.date || 'Jun 2026'}</span>
                        </p>
                        <span>
                            <button class="w-24 h-8 bg-slate-700 text-slate-300 rounded-lg">
                                <a href="readmore-index.html?id=${b.id}" target="_blank" class="w-full h-full block content-center">Read More</a>
                            </button>
                        </span>
                        <span>
                            <button class="w-20 h-8 bg-gradient-to-r from-orange-500 to-red-400 text-white rounded-xl">
                                <a href="editBlog-page.html?id=${b.id}" target="_blank" class="w-full h-full block content-center">Edit</a>
                            </button>
                        </span>
                    </div>
                </div>
            `;
        });

        boxBlog.innerHTML = blogResult;

    } catch (error) {
        console.log("data receiving error");
        boxBlog.innerHTML = "<p class='text-white'> data loading error</p>";
    }
}

// گوش دادن به تغییرات اینپوت جستجو
document.getElementById("searchInput").addEventListener("input", (e) => {
    getBlog(e.target.value);
});

// اجرای اولیه برای نمایش همه بلاگ‌ها
getBlog();
