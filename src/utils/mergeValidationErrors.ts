export const mergeValidationErrors = (errors: any[]) => {
  const error: any = {}
  errors.forEach((err: any) => (
    error[err.param]
      ? error[err.param].push(err.msg)
      : error[err.param] = [err.msg])
  )
  return error
}
