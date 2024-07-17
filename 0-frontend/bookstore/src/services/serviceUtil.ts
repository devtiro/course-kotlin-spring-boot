export const handleServerException = (response: Response) => {
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("The request to the server was incorrect.");
    }

    if (response.status === 500) {
      throw new Error(
        "There was a problem on the server or it may not be running."
      );
    }

    throw new Error("Bad response from server");
  }
};
