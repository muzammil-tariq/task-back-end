const { AWS_DEFAULT_REGION, AWS_BUCKET_NAME, NODE_ENV } = process.env;

const { DeleteObjectCommand, PutObjectCommand, GetObjectCommand } = s3;
const { getSignedUrl } = s3RequestPresigner;
const s3Client = new s3.S3Client({
  region: AWS_DEFAULT_REGION,
});

exports.getUploadSignedUrl = async function ({ path, expiresIn = 900 }) {
  const fileName = utils.uid.generateUID();
  const key = `${NODE_ENV}/${path}/${fileName}`;
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    ContentType: "image/*",
  });
  return {
    url: await getSignedUrl(s3Client, command, {
      expiresIn,
    }),
    fileName,
    key,
  };
};

exports.getObjectSignedUrl = async function ({ key, expiresIn = 900 }) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(s3Client, command, {
    expiresIn,
  });
};

exports.deleteObject = async function ({ key }) {
  const command = new DeleteObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
  });
  return await s3Client.send(command);
};
