async function postNewBlog(e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const image = document.getElementById("image").value.trim();
    const description = document.getElementById("description").value.trim();

    const newBlog = {
        title,
        image,
        description,
        date: new Date().toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
        })
    };

    try {
        const response = await fetch("https://6a1ea7dfb79eec0d6cefcdfd.mockapi.io/api/blog-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBlog)
        });

        if (response.ok) {
            alert("successfully saved");
            window.location.href = "index.html";
        } else {
            console.log("save failed");
        }
    } catch (error) {
        console.error("data sending error:", error);
    }
}
