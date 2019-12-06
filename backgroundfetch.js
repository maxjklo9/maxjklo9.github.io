fetch("https://api.nasa.gov/planetary/apod?api_key=390R0zm07UZQQUmNUBfYDMcAIQoqUo3tq0MdAXn0")
    .then((resp) => resp.json())
    .then(function(res) {
        document.body.style.backgroundImage = `url(${res.url})`;
    });
