package dev.jeffersonfreitas.myusersam;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.jeffersonfreitas.myusersam.service.CognitoService;
import dev.jeffersonfreitas.myusersam.utils.CryptUtils;
import dev.jeffersonfreitas.myusersam.utils.ErrorResponse;
import software.amazon.awssdk.awscore.exception.AwsServiceException;

public class MyUserConfirmSignUp implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    private final CognitoService cognitoService;
    private final String clientId;
    private final String clientSecret;

    public MyUserConfirmSignUp(){
        this.cognitoService = new CognitoService(System.getenv("AWS_REGION"));
        this.clientId = CryptUtils.decryptKey("MY_COGNITO_POOL_CLIENT_ID");
        this.clientSecret = CryptUtils.decryptKey("MY_COGNITO_POOL_CLIENT_SECRET");
    }

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        LambdaLogger logger = context.getLogger();
        try{
            String requestBodyJson = input.getBody();
            JsonObject requestBody = JsonParser.parseString(requestBodyJson).getAsJsonObject();
            JsonObject userResult = cognitoService.cofirmationSignUp(requestBody, clientId, clientSecret);
            response.withStatusCode(200).withBody(new Gson().toJson(userResult, JsonObject.class));
        }catch (AwsServiceException ex){
            logger.log(ex.awsErrorDetails().errorMessage());
            ErrorResponse errorResponse = new ErrorResponse(ex.awsErrorDetails().errorMessage(), ex.statusCode());
            response.withStatusCode(ex.statusCode()).withBody(new Gson().toJson(errorResponse, ErrorResponse.class));
        }catch (Exception ex){
            logger.log(ex.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(ex.getMessage());
            response.withStatusCode(500).withBody(new Gson().toJson(errorResponse, ErrorResponse.class));
        }
        return response;
    }
}
