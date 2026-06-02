//برای اینکه مشخص باشد صفحه ویرایش کدام بلاگ باز شده
const blogId = new URLSearchParams(window.location.search).get("id");

async function loadBlogData() {
    if (!blogId) {
        alert("Blog id not found");
        window.location.href = "index.html";
        return;
    }

    try {
        //اطلاعات بلاگ گرفته میشود
        const response = await fetch(`https://6a1ea7dfb79eec0d6cefcdfd.mockapi.io/api/blog-info/${blogId}`);
        const blog = await response.json();

        //فیلدها پر میشوند
        document.getElementById("title").value = blog.title || "";
        document.getElementById("image").value = blog.image || "";
        document.getElementById("description").value = blog.description || "";
    } catch (error) {
        console.error("data receiving error:", error);
    }
}

//ویرایش اطلاعات
async function editBlog(e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const image = document.getElementById("image").value.trim();
    const description = document.getElementById("description").value.trim();

    const updatedBlog = {
        title: title,
        image: image,
        description: description,
        date: new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
        })
    };

    try {
        const response = await fetch(`https://6a1ea7dfb79eec0d6cefcdfd.mockapi.io/api/blog-info/${blogId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBlog)
        });

        if (response.ok) {
            alert("successfully updated");
            window.location.href = "index.html";
        } else {
            alert("update failed");
        }
    } catch (error) {
        console.error("data updating error:", error);
    }
}

document.getElementById("editForm").addEventListener("submit", editBlog);

loadBlogData();
