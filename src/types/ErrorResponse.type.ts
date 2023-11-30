
export interface ErrorResponse<T> {
  response: {
    data : {
      status_schema: {
        status_code: number
        status_message: string
      },
      output_schema?: T | any,
    }
  }
}