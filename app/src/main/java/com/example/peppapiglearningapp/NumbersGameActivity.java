package com.example.peppapiglearningapp;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

public class NumbersGameActivity extends AppCompatActivity {
    private TextView scoreText;
    private TextView questionText;
    private Button[] optionButtons;
    private int currentNumber;
    private int score = 0;
    private Random random = new Random();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_numbers_game);

        // Initialize views
        scoreText = findViewById(R.id.scoreText);
        questionText = findViewById(R.id.questionText);
        optionButtons = new Button[]{
            findViewById(R.id.option1),
            findViewById(R.id.option2),
            findViewById(R.id.option3),
            findViewById(R.id.option4)
        };

        // Set up back button
        findViewById(R.id.backButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        // Set up option buttons
        for (Button button : optionButtons) {
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int selectedNumber = Integer.parseInt(button.getText().toString());
                    if (selectedNumber == currentNumber) {
                        score++;
                        scoreText.setText("Score: " + score);
                    }
                    startNewRound();
                }
            });
        }

        startNewRound();
    }

    private void startNewRound() {
        // Generate random number between 1 and 10
        currentNumber = random.nextInt(10) + 1;
        questionText.setText("Find the number: " + currentNumber);

        // Generate options
        ArrayList<Integer> options = new ArrayList<>();
        options.add(currentNumber);
        
        // Add 3 random wrong options
        while (options.size() < 4) {
            int wrongOption = random.nextInt(10) + 1;
            if (!options.contains(wrongOption)) {
                options.add(wrongOption);
            }
        }

        // Shuffle options
        Collections.shuffle(options);

        // Set button texts
        for (int i = 0; i < 4; i++) {
            optionButtons[i].setText(String.valueOf(options.get(i)));
        }
    }
} 