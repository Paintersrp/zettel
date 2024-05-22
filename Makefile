run: build
	@./bin/zettel	

build:
	@go build -o bin/zettel .

tw:
	npx tailwindcss -i pkg/web/views/styles/app.css -o public/styles/app.css --watch

templ:
	templ generate --path pkg/web/views --watch --proxy=http://localhost:6474 --open-browser=false
