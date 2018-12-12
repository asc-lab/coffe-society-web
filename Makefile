all: build-all

build-all: build-app build-docker

build-app:
	npm install
	npm run build

build-docker:
	docker build -t csms/coffee-society-web:latest .

clean:
	rm -Rf build

run-app:
	npm start

run-docker:
	docker run -d --name coffee-society-web csms/coffee-society-web

tag:
	docker tag csms/coffee-society-web csms/coffee-society-web:${TAG}

push-latest:
	docker push csms/coffee-society-web:latest

push-tag:
	docker push csms/coffee-society-web:${TAG}

docker-login:
	@docker login -u "${DOCKER_ID}" -p "${DOCKER_PASS}"
	
docker-run: run-docker

docker-remove:
	docker rm -f coffee-society-web

docker-logs:
	docker logs coffee-society-web
