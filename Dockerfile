FROM postgres:latest

ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=20021231
ENV POSTGRES_DB=hospital

VOLUME /var/lib/postgresql/data

