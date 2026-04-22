resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = var.namespace

  create_namespace = false
  cleanup_on_fail  = true
  wait             = true
  timeout          = 600
}