module "namespaces" {
  source     = "./modules/namespaces"
  namespaces = var.namespaces
}

module "monitoring" {
  source = "./modules/monitoring"

  depends_on = [module.namespaces]
}

module "argocd" {
  source = "./modules/argocd"

  depends_on = [module.namespaces]
}