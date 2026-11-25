import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => {
  return (
    <View style={styles.inputContainer}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const CustomButton = ({ title, onPress, variant = 'primary' }) => {
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[styles.button, isSecondary && styles.secondaryButton]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={[styles.buttonText, isSecondary && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const SignUpScreen = ({ users, onRegisterSuccess, onNavigateToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert(
        'Validation Error',
        'Please fill in Full Name, Email, and Password.'
      );
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already exists in registered users array
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      Alert.alert(
        'Duplicate Email',
        'account is already exist use differnt email'
      );
      return;
    }

    const newUser = {
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: password,
      phone: phone.trim(),
      dob: dob.trim(),
    };

    onRegisterSuccess(newUser);

    setFullName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setDob('');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <CustomInput
          label="Full Name *"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />

        <CustomInput
          label="Email Address *"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          label="Password *"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <CustomInput
          label="Phone Number (Optional)"
          value={phone}
          onChangeText={setPhone}
          placeholder="e.g., +92 300 1234567"
          keyboardType="phone-pad"
          autoCapitalize="none"
        />

        <CustomInput
          label="Date of Birth (Optional)"
          value={dob}
          onChangeText={setDob}
          placeholder="DD/MM/YYYY"
          autoCapitalize="none"
        />

        <CustomButton title="Register" onPress={handleRegister} />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const LoginScreen = ({ users, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (matchedUser) {
      Alert.alert('Success', 'User login successfully');
    } else {
      Alert.alert('Error', 'User not found');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        <CustomInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <CustomButton title="Login" onPress={handleLogin} />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onNavigateToSignUp}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('SignUp');
  const [users, setUsers] = useState([]);

  const handleRegisterSuccess = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentScreen('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      {currentScreen === 'SignUp' ? (
        <SignUpScreen
          users={users}
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToLogin={() => setCurrentScreen('Login')}
        />
      ) : (
        <LoginScreen
          users={users}
          onNavigateToSignUp={() => setCurrentScreen('SignUp')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563EB',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryText: {
    color: '#2563EB',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
});

export default App;