pipeline {
    agent any

    parameters {
        choice(name: 'ACTION', choices: ['build', 'test', 'deploy'], description: 'Choose action')
        string(name: 'USER_NUMBER', defaultValue: '0', description: 'Enter a number')
    }

    stages {

        stage('Build') {
            when {
                expression { params.ACTION == 'build' }
            }
            steps {
                echo "Running build..."
                echo "User number is: ${params.USER_NUMBER}"
            }
        }

        stage('Test') {
            when {
                expression { params.ACTION == 'test' }
            }
            steps {
                echo "Running test..."
                echo "User number is: ${params.USER_NUMBER}"
            }
        }

        stage('Deploy HTML') {
            when {
                expression { params.ACTION == 'deploy' }
            }
            steps {
                echo "Running deploy..."
                echo "User number is: ${params.USER_NUMBER}"

                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'client',
                    reportFiles: 'index.html',
                    reportName: 'My HTML Page'
                ])
            }
        }
    }
}