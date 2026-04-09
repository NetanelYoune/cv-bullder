pipeline {
    agent any

    parameters {
        string(name: 'NUM1', defaultValue: '0', description: 'מספר ראשון')
        string(name: 'NUM2', defaultValue: '0', description: 'מספר שני')
    }

    stages {
        stage('Calculate Sum') {
            steps {
                script {
                    def a = params.NUM1 as Integer
                    def b = params.NUM2 as Integer
                    def sum = a + b

                    echo "Result: ${a} + ${b} = ${sum}"
                }
            }
        }
    }
}