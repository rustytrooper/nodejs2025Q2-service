export class FavouritesErrorResponseDto {
  statusCode: number;
  message: string;
  error: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = this.getErrorText(statusCode);
  }

  private getErrorText(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'Bad Request';
      case 404:
        return 'Not Found';
      case 422:
        return 'Unprocessable Entity';
      default:
        return 'Internal Server Error';
    }
  }
}
