package com.example.peppapiglearningapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize buttons
        Button btnNumbers = findViewById(R.id.btnNumbers);
        Button btnAlphabet = findViewById(R.id.btnAlphabet);
        Button btnColors = findViewById(R.id.btnColors);
        Button btnShapes = findViewById(R.id.btnShapes);

        // Set click listeners
        btnNumbers.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, NumbersGameActivity.class));
            }
        });

        btnAlphabet.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, AlphabetGameActivity.class));
            }
        });

        btnColors.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, ColorsGameActivity.class));
            }
        });

        btnShapes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, ShapesGameActivity.class));
            }
        });
    }
} 