# Despliegue en Google Cloud Platform de una aplicación NodeJS

Ejemplo de despliegue de una aplicación Node en Google Cloud Platform.

```bash
# Start develop
npm start
```

El despliegue se realiza a través de contenedores docker.

## Prerequisitos

Tener instalado el SDK de google.

https://console.cloud.google.com/home/dashboard

## 1. Crea un projecto (example-backend) desde la consola de Google para obtener el BACKEND-PROJECT-ID

https://console.cloud.google.com/home/dashboard

## 2. Configuración inicial del proyecto con gcloud

Desde la raiz del proyecto ejecutar ejecuta el siguiente comando para establecer la configuración con gcloud.

```bash
gcloud init
```

```bash
➜  deploy-node-app git:(master) gcloud init

    Welcome! This command will take you through the configuration of gcloud.

    Pick configuration to use:
    [1] Re-initialize this configuration [app-example] with new settings
    [2] Create a new configuration
    [3] Switch to and re-initialize existing configuration: [default]
    Please enter your numeric choice:  2

    Enter configuration name. Names start with a lower case letter and
    contain only lower case letters a-z, digits 0-9, and hyphens '-':  example-backend-config
    Your current configuration has been set to: [example-backend-config]

    You can skip diagnostics next time by using the following flag:
      gcloud init --skip-diagnostics
```

Selecciona la cuenta desde la que se creo el proyecto.

Selecciona el proyecto creado anteriormente.

## 3. Crea la imagen

Desde la raiz del proyecto backend ejecutar el siguiente comando:

```bash
gcloud builds submit --tag gcr.io/BACKEND-PROJECT-ID/example-backend
```

```bash
➜  deploy-node-app git:(master) ✗ gcloud builds submit --tag gcr.io/example-backend-288000/example-backend

    Creating temporary tarball archive of 8 file(s) totalling 19.9 KiB before compression.
    Some files were not included in the source upload.

    Check the gcloud log [/home/alex/.config/gcloud/logs/2020.08.29/21.03.18.654613.log] to see which files and the contents of the
    default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
    more).

    Uploading tarball of [.] to [gs://example-backend-288000_cloudbuild/source/1598749398.678577-489c9638cf5c425497edb28801c36416.tgz]
    API [cloudbuild.googleapis.com] not enabled on project [223776350031].
    Would you like to enable and retry (this will take a few minutes)?
    (y/N)?  y

    Enabling service [cloudbuild.googleapis.com] on project [223776350031]...
    Operation "operations/acf.dddbbee4-2b20-4136-b3fb-78582604e1a6" finished successfully.
    Created [https://cloudbuild.googleapis.com/v1/projects/example-backend-288000/builds/67eccbb3-fa94-45b2-99e9-a7e18ee84cdb].
    Logs are available at [https://console.cloud.google.com/cloud-build/builds/67eccbb3-fa94-45b2-99e9-a7e18ee84cdb?project=223776350031].
    ...
```

## 4. Crea el contenedor

```bash
gcloud run deploy --image gcr.io/BACKEND-PROJECT-ID/example-backend --platform managed
```

- Se te solicitará el nombre del servicio; presiona Intro para aceptar el nombre predeterminado.
- Se te solicitará la región; selecciona la región que prefieras.
- Se te solicitará permitir invocaciones no autenticadas; responde y.

```bash
➜  deploy-node-app git:(master) ✗ gcloud run deploy --image gcr.io/example-backend-288000/example-backend --platform managed

    Service name (example-backend):
    API [run.googleapis.com] not enabled on project [223776350031]. Would
    you like to enable and retry (this will take a few minutes)? (y/N)?  y

    Enabling service [run.googleapis.com] on project [223776350031]...
    Operation "operations/acf.9999dfed-085b-401a-85d6-e493138c0e13" finished successfully.
    Please specify a region:
    [1] asia-east1
    [2] asia-northeast1
    [3] asia-northeast2
    [4] asia-southeast1
    [5] australia-southeast1
    [6] europe-north1
    [7] europe-west1
    [8] europe-west4
    [9] northamerica-northeast1
    [10] us-central1
    [11] us-east1
    [12] us-east4
    [13] us-west1
    [14] cancel
    Please enter your numeric choice:  13

    To make this the default region, run `gcloud config set run/region us-west1`.

    Allow unauthenticated invocations to [example-backend] (y/N)?  y

    Deploying container to Cloud Run service [example-backend] in project [example-backend-288000] region [us-west1]
    ✓ Deploying new service... Done.
      ✓ Creating Revision... Revision deployment finished. Waiting for health check to begin.
      ✓ Routing traffic...
      ✓ Setting IAM Policy...
    Done.
    Service [example-backend] revision [example-backend-00001-paf] has been deployed and is serving 100 percent of traffic at https://example-backend-64ev6oddca-uw.a.run.app
```

Finalmente, abre la URL de servicio en un navegador web para visitar el contenedor implementado.

```bash
https://example-backend-64ev6oddca-uw.a.run.app
```

## Referencias

https://cloud.google.com/run/docs/quickstarts/build-and-deploy
https://cloud.google.com/nodejs/getting-started/hello-world
https://cloud.google.com/appengine/docs/flexible/nodejs/testing-and-deploying-your-app
