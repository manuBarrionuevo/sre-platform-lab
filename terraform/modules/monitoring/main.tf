resource "helm_release" "prometheus" {
  name       = "monitoring"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "prometheus"
  namespace  = var.namespace

  create_namespace = false
  cleanup_on_fail  = true
  wait             = true
  timeout          = 600

  set {
    name  = "alertmanager.enabled"
    value = "false"
  }

  set {
    name  = "pushgateway.enabled"
    value = "false"
  }

  set {
    name  = "server.persistentVolume.enabled"
    value = "false"
  }

  values = [
    yamlencode({
      serverFiles = {
        "prometheus.yml" = {
          scrape_configs = [
            {
              job_name = "prometheus"
              static_configs = [
                {
                  targets = ["localhost:9090"]
                }
              ]
            },
            {
              job_name = "platform-app"
              metrics_path = "/metrics"
              static_configs = [
                {
                  targets = ["platform-app.dev.svc.cluster.local:3000"]
                }
              ]
            }
          ]
        }
      }
    })
  ]
}