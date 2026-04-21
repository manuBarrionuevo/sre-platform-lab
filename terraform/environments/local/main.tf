variable "kubeconfig_path" {
  description = "Ruta al kubeconfig local"
  type        = string
}

variable "namespaces" {
  description = "Namespaces base de la plataforma"
  type        = list(string)
}

module "platform" {
  source = "../.."

  kubeconfig_path = var.kubeconfig_path
  namespaces      = var.namespaces
}