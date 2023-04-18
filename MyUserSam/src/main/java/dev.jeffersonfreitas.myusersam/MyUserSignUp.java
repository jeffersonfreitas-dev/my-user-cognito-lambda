package dev.jeffersonfreitas.myusersam;

import java.util.HashMap;
import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.jeffersonfreitas.myusersam.service.CognitoService;
import dev.jeffersonfreitas.myusersam.utils.CryptUtils;
import dev.jeffersonfreitas.myusersam.utils.ErrorResponse;
import software.amazon.awssdk.awscore.exception.AwsServiceException;

public class MyUserSignUp implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    private final CognitoService cognitoService;
    private final String clientId;
    private final String clientSecret;

    public MyUserSignUp() {
        this.cognitoService = new CognitoService(System.getenv("AWS_REGION"));
        this.clientId = CryptUtils.decryptKey("MY_COGNITO_POOL_CLIENT_ID");
        this.clientSecret = CryptUtils.decryptKey("MY_COGNITO_POOL_CLIENT_SECRET");
    }

    public APIGatewayProxyResponseEvent handleRequest(final APIGatewayProxyRequestEvent input, final Context context) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent()
                .withHeaders(headers);

        String requestBody = input.getBody();
        LambdaLogger logger = context.getLogger();
        logger.log("Original json request: " + requestBody);

        JsonObject userDetails = null;

        try{
            userDetails = JsonParser.parseString(requestBody).getAsJsonObject();
            JsonObject createUserResult = cognitoService.createUser(userDetails, clientId, clientSecret);
            response.withStatusCode(200).withBody(new Gson().toJson(createUserResult, JsonObject.class));
        }catch (AwsServiceException ex){
            logger.log(ex.awsErrorDetails().errorMessage());
            ErrorResponse errorResponse = new ErrorResponse(ex.awsErrorDetails().errorMessage(), ex.statusCode());
            String errorMessage = new Gson().toJson(errorResponse, ErrorResponse.class);
            response.withStatusCode(ex.awsErrorDetails().sdkHttpResponse().statusCode()).withBody(errorMessage);
        }catch (Exception ex) {
            logger.log(ex.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(ex.getMessage());
            String errorResponseJson = new GsonBuilder().serializeNulls().create().toJson(errorResponse, ErrorResponse.class);
            response.withStatusCode(500).withBody(errorResponseJson);
        }
        return response;
    }
}
