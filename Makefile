run: build
	@./bin/zettel	

build:
	@go build -o bin/zettel .

web-dev:
	cd internal/web && npm run dev 

tw:
	npx tailwindcss -i pkg/web/views/styles/app.css -o public/styles/app.css --minify --watch

templ:
	templ generate --path pkg/web/views --watch --proxy=http://localhost:6474 --open-browser=false
