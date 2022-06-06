router
  .get(
    "/public/image/upload/*",
    validators.public.getImageValidation,
    middlewares.validation.request,
    actions.public.getUploadSignedUrl
  )
  .get(
    "/public/image/*",
    validators.public.getImageValidation,
    middlewares.validation.request,
    actions.public.getImage
  );

module.exports = { prefix: "public", router };
