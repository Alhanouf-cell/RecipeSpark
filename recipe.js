export default async function handler(req, res) {

const { ingredients } = req.query;

try {

const response = await fetch("https://api.openai.com/v1/responses", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": Bearer ${process.env.OPENAI_API_KEY}
},
body: JSON.stringify({
model: "gpt-4.1-mini",
input: Create a simple recipe using these ingredients: ${ingredients}. Include a recipe name and clear cooking steps.
})
});

const data = await response.json();

res.status(200).json(data);

} catch (error) {

res.status(500).json({ error: "Failed to generate recipe" });

}

}