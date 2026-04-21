variable "kubeconfig_path" {
  description = "Ruta al kubeconfig local"
  type        = string
  default     = "~/.kube/config"
}

variable "namespaces" {
  description = "Namespaces base de la plataforma"
  type        = list(string)
  default     = ["dev", "monitoring", "argocd"]
}