<?php
// Sprawdzenie, czy użytkownik wszedł na stronę z parametrem 'confirm' lub poprzez stronę w tej samej domenie
$allowed_referer = 'https://collagenico24.net';
$has_confirm_param = isset($_GET['confirm']) && $_GET['confirm'] === '/confirm';
$referer_valid = isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], $allowed_referer) === 0;

// Jeśli nie ma odpowiedniego referera i brakuje parametru 'confirm', blokujemy dostęp
if (!$has_confirm_param && !$referer_valid) {
    // Ustaw kod odpowiedzi 403 (Forbidden) i wyświetl odpowiedni komunikat
   http_response_code(403);
   die('403 Forbidden - Direct access is not allowed.');
}

// Jeśli warunki są spełnione, kontynuujemy wyświetlanie strony
?>

{{ define "main" }}
    {{- with .Params.page_thankyou -}}
    <section class="typ">
        <div class="container">
            {{- if or .heading .description -}}
                <div class="typ__header">
                    {{- if .heading -}}
                        <h2 class="typ__title">{{ .heading }}</h2>
                    {{- end -}}
                    {{- if .description -}}
                        <p class="typ__desc"> {{ .description }}</p>
                    {{- end -}}
                </div>
            {{- end -}}
            
            {{ if .para_next }}
                <p class="typ__para-next"> {{ .para_next }}</p>
            {{ end }}
            {{- with .list -}}
             {{ if gt ( len .) 0}}
             <ul class="typ__list">
                {{- range . -}}
                    <li class="typ__list-item">
                        {{ if .image }}
                            <img class="typ__list-img" src="{{ .image }}" role="presentation">
                        {{ end }}
                        {{ if .desc }}
                        <p class="typ__list-desc">
                            {{ .desc }}
                        </p>
                        {{ end }}
                    </li>
                {{- end -}}
             </ul>
             {{ end }}
            {{- end -}}

            {{ if .para_end }}
                <p class="typ__para-end">
                    {{ .para_end }}
                </p>
            {{ end }}
        </div>
    </section>
    {{- end -}}
{{ end }}