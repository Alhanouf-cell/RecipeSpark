export default async function handler(req, res) {

const ingredients = req.query.ingredients;

if (!ingredients) {
return res.status(400).json({ error: "Missing ingredients" });
}

try {

const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: 'Create a simple cooking recipe using these ingredients: ${ingredients}. Include a recipe name  and clear step-by-step instructions.'
    })
});

const data = await response.json();

const recipe = data.output?.[0]?.content?.[0]?.text || "Could not generate recipe.";

res.status(200).json({ recipe });

} catch (error) {

res.status(500).json({ error: "Error generating recipe" });

}

}