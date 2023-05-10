install:
	npm ci

publish:
	npm publish --dry-run

test:
	npx jest

lint:
	npx eslint .