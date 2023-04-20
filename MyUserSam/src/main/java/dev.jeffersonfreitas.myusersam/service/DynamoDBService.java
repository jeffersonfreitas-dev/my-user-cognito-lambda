package dev.jeffersonfreitas.myusersam.service;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemResponse;

import java.time.LocalDateTime;
import java.util.HashMap;

public class DynamoDBService {

    private final String TABLE_NAME = "users";

    private final DynamoDbClient dbClient;

    public DynamoDBService(String region){
        this.dbClient = DynamoDbClient.builder().region(Region.of(region)).build();
    }

    public void createItem(final String name, final String email, final String userId) {
        HashMap<String, AttributeValue> itemValues = new HashMap<>();
        itemValues.put("name", AttributeValue.builder().s(name).build());
        itemValues.put("email", AttributeValue.builder().s(email).build());
        itemValues.put("uuid", AttributeValue.builder().s(userId).build());
        itemValues.put("created_at", AttributeValue.builder().s(LocalDateTime.now().toString()).build());

        PutItemRequest request = PutItemRequest.builder().tableName(TABLE_NAME).item(itemValues).build();
        PutItemResponse response = dbClient.putItem(request);
        if(!response.sdkHttpResponse().isSuccessful()) {
            throw new IllegalArgumentException("Erro ao criar o usuário no banco de dados");
        }
    }
}
