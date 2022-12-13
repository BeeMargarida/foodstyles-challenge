export default function convertRequestToQueryParams(request: object): string {
  return (
    Object.entries(request)
      // Prevent printing empty values on the request URL.
      .filter(
        ([, value]) =>
          value !== undefined &&
          value !== null &&
          (!Array.isArray(value) || value?.length > 0)
      )
      .map(
        ([key, value]) => `${key}=${encodeURIComponent(JSON.stringify(value))}`
      )
      .join("&") || ""
  );
}
