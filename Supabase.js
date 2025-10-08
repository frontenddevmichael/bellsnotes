// 🔧 Supabase configuration
const SUPABASE_URL = "https://gqaitbqzlpdlunvdbxfk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYWl0YnF6bHBkbHVudmRieGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MjE3ODksImV4cCI6MjA3NTM5Nzc4OX0.xiyOhmw6rjr0-trpCPFWhnbJlm0XuZj9HNmIeHekIcA";

// ✅ Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = client;

// 📥 Fetch and display materials from Supabase
async function loadMaterials() {
    const grid = document.querySelector(".card-grid");
    grid.innerHTML = "";

    // Fetch materials from the table
    const { data: materials, error } = await supabase
        .from("materials")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading materials:", error.message);
        return;
    }

    // Handle empty state
    if (!materials || materials.length === 0) {
        document.querySelector(".empty-state").style.display = "block";
        return;
    }

    document.querySelector(".empty-state").style.display = "none";

    // Render each material card
    materials.forEach(mat => {
        const card = document.createElement("div");
        card.className = "material-card";
        card.setAttribute("data-college", mat.college || "");
        card.setAttribute("data-department", mat.department || "");
        card.setAttribute("data-level", mat.level || "");
        card.setAttribute("data-semester", mat.semester || "");
        card.setAttribute("data-type", mat.type || "");
        card.setAttribute("data-title", mat.title || "");
        card.setAttribute("data-code", mat.code || "");

        card.innerHTML = `
            <h3>${mat.title}</h3>
            <span class="code">${mat.code} 
                <span class="tag ${mat.type?.toLowerCase() === 'note' ? 'note' : 'pq'}">${mat.type}</span>
            </span>
            <p>Level: <strong>${mat.level}</strong></p>
            <p>Semester: <strong>${mat.semester}</strong></p>
            <p>College: <strong>${mat.college}</strong></p>
            <a href="${mat.download_link}" class="btn" target="_blank">⬇ Download PDF</a>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", loadMaterials);
