import android.os.Bundle
import android.text.method.HideReturnsTransformationMethod
import android.text.method.PasswordTransformationMethod
import android.widget.Button
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.ceylone_creation.R
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.textfield.TextInputLayout

class SignInActivity : AppCompatActivity() {

    private lateinit var emailEditText: TextInputEditText
    private lateinit var passwordEditText: TextInputEditText
    private lateinit var passwordLayout: TextInputLayout
    private lateinit var signInButton: Button
    private lateinit var googleSignUpButton: ImageButton
    private lateinit var signUpText: TextView
    private lateinit var forgotPasswordText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_in)

        // Initialize views
        emailEditText = findViewById(R.id.emailEditText)
        passwordEditText = findViewById(R.id.passwordEditText)
        passwordLayout = findViewById(R.id.passwordLayout)
        signInButton = findViewById(R.id.signInButton)
        googleSignUpButton = findViewById(R.id.googleSignUpButton)
        signUpText = findViewById(R.id.signUpText)
        forgotPasswordText = findViewById(R.id.forgotPasswordText)

        // Set up password toggle functionality
        setupPasswordToggle()

        // Set click listeners
        signInButton.setOnClickListener {
            val email = emailEditText.text.toString()
            val password = passwordEditText.text.toString()

            if (validateInputs(email, password)) {
                // Perform sign in
                performSignIn(email, password)
            }
        }

        googleSignUpButton.setOnClickListener {
            // Handle Google sign in
            Toast.makeText(this, "Google Sign In clicked", Toast.LENGTH_SHORT).show()
        }

        signUpText.setOnClickListener {
            // Navigate to sign up activity
            Toast.makeText(this, "Navigate to Sign Up", Toast.LENGTH_SHORT).show()
        }

        forgotPasswordText.setOnClickListener {
            // Navigate to forgot password activity
            Toast.makeText(this, "Navigate to Forgot Password", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setupPasswordToggle() {
        // Customize the password toggle icon if needed
        passwordLayout.setEndIconDrawable(R.drawable.ic_visibility_off)

        passwordLayout.setEndIconOnClickListener {
            val selection = passwordEditText.selectionEnd
            if (passwordEditText.transformationMethod == PasswordTransformationMethod.getInstance()) {
                // Show password
                passwordEditText.transformationMethod = HideReturnsTransformationMethod.getInstance()
                passwordLayout.setEndIconDrawable(R.drawable.ic_visibility)
            } else {
                // Hide password
                passwordEditText.transformationMethod = PasswordTransformationMethod.getInstance()
                passwordLayout.setEndIconDrawable(R.drawable.ic_visibility_off)
            }
            passwordEditText.setSelection(selection)
        }
    }

    private fun validateInputs(email: String, password: String): Boolean {
        if (email.isEmpty()) {
            emailEditText.error = "Email is required"
            return false
        }

        if (password.isEmpty()) {
            passwordEditText.error = "Password is required"
            return false
        }

        if (password.length < 6) {
            passwordEditText.error = "Password must be at least 6 characters"
            return false
        }

        return true
    }

    private fun performSignIn(email: String, password: String) {
        // Implement your sign in logic here
        Toast.makeText(this, "Signing in with $email", Toast.LENGTH_SHORT).show()

        // Example: Firebase Authentication
        // FirebaseAuth.getInstance().signInWithEmailAndPassword(email, password)
        //     .addOnCompleteListener { task ->
        //         if (task.isSuccessful) {
        //             // Sign in success
        //         } else {
        //             // Sign in failed
        //         }
        //     }
    }
}