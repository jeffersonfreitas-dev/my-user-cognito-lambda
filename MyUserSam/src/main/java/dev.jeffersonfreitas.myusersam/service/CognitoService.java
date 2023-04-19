package dev.jeffersonfreitas.myusersam.service;

import com.google.gson.JsonObject;
import dev.jeffersonfreitas.myusersam.utils.Constant;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class CognitoService {

    private final CognitoIdentityProviderClient cognitoProvider;

    public CognitoService(String region) {
        this.cognitoProvider = CognitoIdentityProviderClient.builder().region(Region.of(region)).build();
    }

    public JsonObject createUser(JsonObject userDetails, String clientId, String clientSecret) {

        final String name = userDetails.get("name").getAsString();
        final String email = userDetails.get("email").getAsString();
        final String userId = UUID.randomUUID().toString().toLowerCase();
        final String password = userDetails.get("password").getAsString();

        AttributeType emailAttribute = AttributeType.builder().name("email").value(email).build();
        AttributeType nameAttribute = AttributeType.builder().name("name").value(name).build();
        AttributeType userIdAttribute = AttributeType.builder().name("custom:userId").value(userId).build();
        List<AttributeType> attributeTypes = Arrays.asList(emailAttribute, nameAttribute, userIdAttribute);

        final String secretHash = calculateSecretHash(clientId, clientSecret, email);

        SignUpRequest signUpRequest = SignUpRequest.builder()
                .clientId(clientId)
                .password(password)
                .secretHash(secretHash)
                .userAttributes(attributeTypes)
                .username(email)
                .build();

        SignUpResponse signUpResponse = cognitoProvider.signUp(signUpRequest);
        JsonObject response = new JsonObject();
        response.addProperty(Constant.IS_SUCCESSFUL, signUpResponse.sdkHttpResponse().isSuccessful());
        response.addProperty(Constant.IS_CONFIRMED, signUpResponse.userConfirmed());
        response.addProperty(Constant.STATUS_CODE, signUpResponse.sdkHttpResponse().statusCode());
        response.addProperty(Constant.COGNITO_USER_ID, signUpResponse.userSub());
        return response;
    }


    public JsonObject cofirmationSignUp(JsonObject requestBody, String clientId, String clientSecret) {
        final String email = requestBody.get("email").getAsString();
        final String code = requestBody.get("code").getAsString();

        final String secretHash = calculateSecretHash(clientId, clientSecret, email);

        ConfirmSignUpRequest confirmSignUpRequest = ConfirmSignUpRequest.builder()
                .clientId(clientId)
                .secretHash(secretHash)
                .username(email)
                .confirmationCode(code)
                .build();

        ConfirmSignUpResponse responseSignUp = cognitoProvider.confirmSignUp(confirmSignUpRequest);
        JsonObject response = new JsonObject();
        response.addProperty("isSuccessful", responseSignUp.sdkHttpResponse().isSuccessful());
        response.addProperty("statusCode", responseSignUp.sdkHttpResponse().statusCode());
        return response;
    }

    public JsonObject login(JsonObject requestBody, String clientId, String clientSecret) {
        final String email = requestBody.get("email").getAsString();
        final String password = requestBody.get("password").getAsString();

        final String secretHash = calculateSecretHash(clientId, clientSecret, email);

        Map<String, String> authParams = new HashMap<>() {
            {
                put("USERNAME", email);
                put("PASSWORD", password);
                put("SECRET_HASH", secretHash);
            }
        };

        InitiateAuthRequest initiateAuthRequest = InitiateAuthRequest.builder()
                .clientId(clientId)
                .authFlow(AuthFlowType.USER_PASSWORD_AUTH)
                .authParameters(authParams)
                .build();
        InitiateAuthResponse initiateAuthResponse = cognitoProvider.initiateAuth(initiateAuthRequest);
        AuthenticationResultType authenticationResultType = initiateAuthResponse.authenticationResult();
        JsonObject response = new JsonObject();
        response.addProperty("isSuccessful", initiateAuthResponse.sdkHttpResponse().isSuccessful());
        response.addProperty("statusCode", initiateAuthResponse.sdkHttpResponse().statusCode());
        response.addProperty("idToken", authenticationResultType.idToken());
        response.addProperty("accessToken", authenticationResultType.accessToken());
        response.addProperty("refreshToken", authenticationResultType.accessToken());
        return response;
    }

    private String calculateSecretHash(String userPoolClientId, String userPoolClientSecret, String userName) {
        final String HMAC_SHA256_ALGORITHM = "HmacSHA256";

        SecretKeySpec signingKey = new SecretKeySpec(
                userPoolClientSecret.getBytes(StandardCharsets.UTF_8),
                HMAC_SHA256_ALGORITHM);
        try {
            Mac mac = Mac.getInstance(HMAC_SHA256_ALGORITHM);
            mac.init(signingKey);
            mac.update(userName.getBytes(StandardCharsets.UTF_8));
            byte[] rawHmac = mac.doFinal(userPoolClientId.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Error while calculating ");
        }
    }
}
