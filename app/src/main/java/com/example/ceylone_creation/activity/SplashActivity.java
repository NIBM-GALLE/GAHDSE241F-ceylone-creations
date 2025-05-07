package com.example.ceylone_creation.activity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.appcompat.app.AppCompatActivity;

import com.example.ceylone_creation.R;

public class SplashActivity extends AppCompatActivity {

    // Splash screen duration in milliseconds
    private static final int SPLASH_DELAY = 1500; // Reduced to 2 seconds (better UX)

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // Using Looper.getMainLooper() to ensure execution on main thread
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            navigateToNextScreen();
            finish(); // Close the splash activity
        }, SPLASH_DELAY);
    }

    private void navigateToNextScreen() {
        // Check if user is already logged in (you would implement this logic)
        if (isUserLoggedIn()) {
            startActivity(new Intent(this, MainActivity.class));
        } else {
            // Changed to WelcomeActivity instead of MainActivity
            startActivity(new Intent(this, WelcomeActivity.class));
        }

        // Add transition animation
        overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
    }

    // Placeholder for your authentication check
    private boolean isUserLoggedIn() {
        // Implement your actual login check logic here
        // For example, check SharedPreferences or Firebase Auth
        return false; // Default to false for now
    }

    @Override
    public void onBackPressed() {
        // Disable back button during splash screen
        // super.onBackPressed(); // Commented out to prevent interruption
    }
}