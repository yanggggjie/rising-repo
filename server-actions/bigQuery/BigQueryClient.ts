const { BigQuery } = require('@google-cloud/bigquery')

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, 'base64')
    .toString()
    .replace(/\n/g, ''),
)

const BigqueryClient = new BigQuery({
  projectId: credential.project_id,
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  },
})

export { BigqueryClient }
