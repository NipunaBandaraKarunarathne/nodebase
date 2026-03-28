export const HTTP_REQUEST_CHANNEL = "http-request-execution/status";

export type HttpRequestStatusPayload = {
  nodeId: string;
  status: "loading" | "success" | "error";
};