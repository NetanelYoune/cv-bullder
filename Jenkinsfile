pipeline {
    agent any

    parameters {
        choice(name: 'ACTION', choices: ['build', 'test'], description: 'Choose action')
    }

    stages {
        stage('Run Action') {
            steps {
                script {
                    if (params.ACTION == 'build') {
                        echo 'Running build...'
                    } else {
                        echo 'Running test...'
                    }
                }
            }
        }
    }
}