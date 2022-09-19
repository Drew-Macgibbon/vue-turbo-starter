// WIP

// import ApiError from './ApiError'

// function apiErrorHandler(err, req, res, next) {
//   // in prod, don't use console.log or console.err because it's not async
//   console.error(err)

//   if (err instanceof ApiError) {
//     res.status(err.code).json(err.message)
//     return
//   }

//   res.status(500).json('something went wrong')
// }

// export default apiErrorHandler
