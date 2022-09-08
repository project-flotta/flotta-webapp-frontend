

app-up:
	cp .env.example .env
	cp app/.env.example app/.env
	docker-compose up -d
