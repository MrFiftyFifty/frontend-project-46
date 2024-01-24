install:
	npm ci

lint-fix:
	npx eslint --fix .

lint:
	npx eslint .

test:
	npm test